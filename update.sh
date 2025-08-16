#!/bin/bash

# ================================================================
# Smart Update Script for Django + Next.js Application
# ================================================================
# Detects what changed and updates accordingly
# Usage: bash update.sh [--quick|--rebuild|--full]
# ================================================================

set -e

# Load project info
PROJECT_NAME="ngo-cms"
PROJECT_FOLDER="/var/www/${PROJECT_NAME}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Update mode
MODE=${1:-"--quick"}

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}   Updating ${PROJECT_NAME}${NC}"
echo -e "${CYAN}   Mode: ${MODE}${NC}"
echo -e "${CYAN}========================================${NC}"

# Pull latest code
if [ -d ".git" ]; then
    echo -e "${BLUE}[1/5] Pulling latest code...${NC}"
    BEFORE_PULL=$(git rev-parse HEAD)
    git pull
    AFTER_PULL=$(git rev-parse HEAD)
    
    if [ "$BEFORE_PULL" = "$AFTER_PULL" ]; then
        echo -e "${YELLOW}No new changes from git${NC}"
    else
        # Check what changed
        BACKEND_CHANGED=$(git diff --name-only $BEFORE_PULL $AFTER_PULL | grep -c "^backend/" || true)
        FRONTEND_CHANGED=$(git diff --name-only $BEFORE_PULL $AFTER_PULL | grep -c "^frontend/" || true)
        
        echo -e "${GREEN}Backend changes: ${BACKEND_CHANGED} files${NC}"
        echo -e "${GREEN}Frontend changes: ${FRONTEND_CHANGED} files${NC}"
    fi
else
    echo -e "${YELLOW}Not a git repository, skipping pull${NC}"
    BACKEND_CHANGED=1
    FRONTEND_CHANGED=1
fi

case $MODE in
    --quick)
        echo -e "${BLUE}[2/5] Quick restart mode - no rebuild${NC}"
        # Just restart containers to pick up volume-mounted changes
        docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod restart backend frontend
        ;;
        
    --rebuild)
        echo -e "${BLUE}[2/5] Rebuilding changed services...${NC}"
        
        if [ "$BACKEND_CHANGED" -gt 0 ]; then
            echo -e "${BLUE}Rebuilding backend...${NC}"
            docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod build backend
            docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod up -d backend
        fi
        
        if [ "$FRONTEND_CHANGED" -gt 0 ]; then
            echo -e "${BLUE}Rebuilding frontend...${NC}"
            # For frontend, we need to rebuild inside the container
            docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod exec frontend npm run build
            docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod restart frontend
        fi
        ;;
        
    --full)
        echo -e "${BLUE}[2/5] Full rebuild mode${NC}"
        docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod down
        docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod build --no-cache
        docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod up -d
        ;;
        
    *)
        echo -e "${RED}Invalid mode. Use: --quick, --rebuild, or --full${NC}"
        exit 1
        ;;
esac

# Run migrations if backend changed
if [ "$BACKEND_CHANGED" -gt 0 ] || [ "$MODE" = "--full" ]; then
    echo -e "${BLUE}[3/5] Running migrations...${NC}"
    docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod exec -T backend python manage.py migrate --noinput || true
    
    echo -e "${BLUE}[4/5] Collecting static files...${NC}"
    docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod exec -T backend python manage.py collectstatic --noinput || true
    
    # Copy static files to host
    docker cp $(docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod ps -q backend):/app/static/. ${PROJECT_FOLDER}/static/ 2>/dev/null || true
    sudo chown -R www-data:www-data ${PROJECT_FOLDER}/static 2>/dev/null || true
else
    echo -e "${YELLOW}[3/5] Skipping migrations (no backend changes)${NC}"
    echo -e "${YELLOW}[4/5] Skipping static collection${NC}"
fi

# Clear caches
echo -e "${BLUE}[5/5] Clearing caches...${NC}"
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod restart nginx

# Show status
echo
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}✅ Update completed!${NC}"
echo -e "${CYAN}========================================${NC}"
echo
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod ps
echo
echo -e "${CYAN}Usage options:${NC}"
echo -e "  ${YELLOW}bash update.sh --quick${NC}   : Just restart (fastest, for minor changes)"
echo -e "  ${YELLOW}bash update.sh --rebuild${NC} : Rebuild changed services only"
echo -e "  ${YELLOW}bash update.sh --full${NC}    : Full rebuild everything"
echo
echo -e "${CYAN}View logs:${NC} ${YELLOW}docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml logs -f${NC}"