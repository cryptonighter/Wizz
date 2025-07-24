#!/bin/bash

# Wizz Database Setup Script

echo "🔧 Setting up Wizz database..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed or not in PATH"
    echo "Please install PostgreSQL and try again"
    exit 1
fi

# Database configuration
DB_NAME="wizz"
DB_USER="wizz_user"
DB_PASSWORD="wizz_password"

# Create database and user
echo "Creating database and user..."
psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "User might already exist, continuing..."
psql -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || echo "Database might already exist, continuing..."

# Apply schema
echo "Applying database schema..."
psql -U $DB_USER -d $DB_NAME -f database/schema.sql 2>/dev/null || echo "Schema might already be applied, continuing..."

echo "✅ Database setup completed!"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo "Password: $DB_PASSWORD"
echo ""
echo "To connect to the database:"
echo "psql -U $DB_USER -d $DB_NAME"