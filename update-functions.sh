#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE=".env"
PROJECT_NAME="ngo-cms"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running in production mode
check_production() {
    if [ ! -f "$ENV_FILE" ]; then
        print_error "Production environment file $ENV_FILE not found!"
        return 1
    fi
    return 0
}

# Update frontend only
update_frontend() {
    print_status "Starting frontend update..."
    
    # Build the new frontend image
    print_status "Building frontend Docker image..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE build frontend; then
        print_success "Frontend image built successfully"
    else
        print_error "Failed to build frontend image"
        return 1
    fi
    
    # Stop and recreate frontend container
    print_status "Recreating frontend container..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d frontend --force-recreate; then
        print_success "Frontend container updated successfully"
    else
        print_error "Failed to recreate frontend container"
        return 1
    fi
    
    print_status "Waiting for frontend to be ready..."
    sleep 5
    
    # Check if frontend is running
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE ps | grep -q "frontend.*Up"; then
        print_success "Frontend is running and updated!"
    else
        print_error "Frontend container is not running properly"
        docker compose -p $PROJECT_NAME -f $COMPOSE_FILE logs frontend --tail=50
        return 1
    fi
}

# Update backend only
update_backend() {
    print_status "Starting backend update..."
    
    # Build the new backend image
    print_status "Building backend Docker image..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE build backend; then
        print_success "Backend image built successfully"
    else
        print_error "Failed to build backend image"
        return 1
    fi
    
    # Run migrations before updating
    run_migrations
    
    # Collect static files
    collect_static
    
    # Stop and recreate backend container
    print_status "Recreating backend container..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d backend --force-recreate; then
        print_success "Backend container updated successfully"
    else
        print_error "Failed to recreate backend container"
        return 1
    fi
    
    print_status "Waiting for backend to be ready..."
    sleep 10
    
    # Check if backend is running
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE ps | grep -q "backend.*Up"; then
        print_success "Backend is running and updated!"
    else
        print_error "Backend container is not running properly"
        docker compose -p $PROJECT_NAME -f $COMPOSE_FILE logs backend --tail=50
        return 1
    fi
}

# Update both frontend and backend
update_all() {
    print_status "Starting full application update..."
    
    # Build all images
    print_status "Building all Docker images..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE build; then
        print_success "All images built successfully"
    else
        print_error "Failed to build images"
        return 1
    fi
    
    # Run migrations
    run_migrations
    
    # Collect static files
    collect_static
    
    # Recreate all containers
    print_status "Recreating all containers..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d --force-recreate; then
        print_success "All containers updated successfully"
    else
        print_error "Failed to recreate containers"
        return 1
    fi
    
    print_status "Waiting for services to be ready..."
    sleep 10
    
    # Check if all services are running
    check_services
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE exec -T backend python manage.py migrate; then
        print_success "Migrations completed successfully"
    else
        print_error "Failed to run migrations"
        return 1
    fi
}

# Collect static files
collect_static() {
    print_status "Collecting static files..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE exec -T backend python manage.py collectstatic --noinput; then
        print_success "Static files collected successfully"
    else
        print_error "Failed to collect static files"
        return 1
    fi
}

# Check service health
check_services() {
    print_status "Checking service status..."
    
    local all_healthy=true
    
    # Check each service
    for service in db backend frontend nginx; do
        if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE ps | grep -q "$service.*Up"; then
            print_success "$service is running"
        else
            print_error "$service is not running"
            all_healthy=false
        fi
    done
    
    if [ "$all_healthy" = true ]; then
        print_success "All services are running!"
    else
        print_error "Some services are not running properly"
        return 1
    fi
}

# Show logs for a specific service
show_logs() {
    local service=$1
    local lines=${2:-100}
    
    if [ -z "$service" ]; then
        print_error "Please specify a service (frontend, backend, db, nginx)"
        return 1
    fi
    
    print_status "Showing last $lines lines of $service logs..."
    docker compose -p $PROJECT_NAME -f $COMPOSE_FILE logs $service --tail=$lines
}

# Restart a specific service
restart_service() {
    local service=$1
    
    if [ -z "$service" ]; then
        print_error "Please specify a service to restart"
        return 1
    fi
    
    print_status "Restarting $service..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE restart $service; then
        print_success "$service restarted successfully"
    else
        print_error "Failed to restart $service"
        return 1
    fi
}

# Quick deploy with minimal downtime
quick_deploy() {
    print_status "Starting quick deployment..."
    
    # Build images first
    print_status "Building new images..."
    if ! docker compose -p $PROJECT_NAME -f $COMPOSE_FILE build; then
        print_error "Build failed, aborting deployment"
        return 1
    fi
    
    # Run migrations
    run_migrations
    
    # Update services with rolling restart
    print_status "Updating services with minimal downtime..."
    
    # Update backend first
    docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d backend --no-deps
    sleep 5
    
    # Update frontend
    docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d frontend --no-deps
    sleep 5
    
    # Update nginx last
    docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d nginx --no-deps
    
    print_success "Quick deployment completed!"
    check_services
}

# Backup database before update
backup_database() {
    local backup_dir="./backups"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="$backup_dir/db_backup_$timestamp.sql"
    
    # Create backup directory if it doesn't exist
    mkdir -p $backup_dir
    
    print_status "Creating database backup..."
    if docker compose -p $PROJECT_NAME -f $COMPOSE_FILE exec -T db pg_dump -U postgres django_db > $backup_file; then
        print_success "Database backed up to $backup_file"
    else
        print_error "Failed to backup database"
        return 1
    fi
}

# Main menu
show_menu() {
    echo ""
    echo "=== NGO CMS Update Functions ==="
    echo "1. Update Frontend Only"
    echo "2. Update Backend Only"
    echo "3. Update All Services"
    echo "4. Quick Deploy (minimal downtime)"
    echo "5. Run Migrations"
    echo "6. Check Service Status"
    echo "7. Show Logs"
    echo "8. Restart Service"
    echo "9. Backup Database"
    echo "0. Exit"
    echo ""
}

# Main function
main() {
    # Check if we're in production mode
    if ! check_production; then
        print_warning "Running in development mode. Some functions may not work as expected."
    fi
    
    # If no arguments, show menu
    if [ $# -eq 0 ]; then
        while true; do
            show_menu
            read -p "Select an option: " choice
            
            case $choice in
                1) update_frontend ;;
                2) update_backend ;;
                3) update_all ;;
                4) quick_deploy ;;
                5) run_migrations ;;
                6) check_services ;;
                7) 
                    read -p "Enter service name (frontend/backend/db/nginx): " service
                    read -p "Number of lines to show (default 100): " lines
                    show_logs $service ${lines:-100}
                    ;;
                8) 
                    read -p "Enter service name to restart: " service
                    restart_service $service
                    ;;
                9) backup_database ;;
                0) 
                    print_status "Exiting..."
                    exit 0
                    ;;
                *) print_error "Invalid option" ;;
            esac
            
            echo ""
            read -p "Press Enter to continue..."
        done
    else
        # Handle command line arguments
        case $1 in
            frontend) update_frontend ;;
            backend) update_backend ;;
            all) update_all ;;
            deploy) quick_deploy ;;
            migrate) run_migrations ;;
            status) check_services ;;
            logs) show_logs $2 $3 ;;
            restart) restart_service $2 ;;
            backup) backup_database ;;
            *) 
                print_error "Unknown command: $1"
                echo "Usage: $0 [frontend|backend|all|deploy|migrate|status|logs|restart|backup]"
                exit 1
                ;;
        esac
    fi
}

# Run main function
main "$@"