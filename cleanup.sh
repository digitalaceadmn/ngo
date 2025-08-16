#!/bin/bash

# ================================================================
# Cleanup Script for Django + Next.js Deployment
# ================================================================
# This script removes all deployment artifacts for a fresh start
# ================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_NAME="ngo-cms"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}   Cleaning up ${PROJECT_NAME} deployment${NC}"
echo -e "${YELLOW}========================================${NC}"

# Stop and remove all Docker containers, volumes, networks
echo -e "${BLUE}Stopping and removing Docker containers...${NC}"
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml down -v --remove-orphans 2>/dev/null || true
docker-compose -f docker-compose.prod.yml down -v --remove-orphans 2>/dev/null || true

# Remove Docker images
echo -e "${BLUE}Removing Docker images...${NC}"
docker rmi ${PROJECT_NAME}-backend ${PROJECT_NAME}-frontend 2>/dev/null || true
docker rmi ngo-cms-backend ngo-cms-frontend 2>/dev/null || true

# Remove nginx configuration
echo -e "${BLUE}Removing nginx configuration...${NC}"
sudo rm -f /etc/nginx/sites-enabled/${PROJECT_NAME}
sudo rm -f /etc/nginx/sites-available/${PROJECT_NAME}

# Test nginx config before reload
if sudo nginx -t 2>/dev/null; then
    sudo systemctl reload nginx
    echo -e "${GREEN}Nginx reloaded successfully${NC}"
else
    echo -e "${YELLOW}Nginx config has issues, please check manually${NC}"
fi

# Remove static and media files
echo -e "${BLUE}Removing static and media files...${NC}"
sudo rm -rf /var/www/${PROJECT_NAME}

# Remove deployment artifacts
echo -e "${BLUE}Removing deployment artifacts...${NC}"
rm -f .deployment-info
rm -f docker-compose.override.yml

# Clean up Docker system (optional - removes unused data)
echo -e "${BLUE}Cleaning Docker system...${NC}"
docker system prune -f

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Cleanup completed!${NC}"
echo -e "${GREEN}========================================${NC}"
echo
echo -e "You can now run: ${YELLOW}sudo bash deploy.sh${NC}"
echo -e "For a fresh deployment"