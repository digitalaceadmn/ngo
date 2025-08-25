#!/bin/bash

# ================================================================
# Simple Update Script - Frontend changes reflect instantly
# ================================================================

PROJECT_NAME="ngo-cms"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Updating ${PROJECT_NAME}...${NC}"

# Pull latest code
git pull

# Option 1: Just restart frontend (fastest - 5 seconds)
if [ "$1" = "--frontend" ]; then
    echo -e "${YELLOW}Restarting frontend only...${NC}"
    docker compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod restart frontend
    echo -e "${GREEN}✅ Frontend updated!${NC}"

# Option 2: Restart backend
elif [ "$1" = "--backend" ]; then
    echo -e "${YELLOW}Restarting backend only...${NC}"
    docker compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod restart backend
    echo -e "${GREEN}✅ Backend updated!${NC}"

# Option 3: Restart both (default)
else
    echo -e "${YELLOW}Restarting all services...${NC}"
    docker compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod restart
    echo -e "${GREEN}✅ All services updated!${NC}"
fi

echo
echo -e "${BLUE}Note: Frontend runs in dev mode - changes appear instantly after restart!${NC}"
echo -e "${YELLOW}View logs: docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml --env-file .env.prod logs -f${NC}"