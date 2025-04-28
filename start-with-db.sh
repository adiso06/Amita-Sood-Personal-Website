#!/bin/bash
export DATABASE_URL="postgresql://neondb_owner:npg_fkTEOC4S7nuW@ep-orange-bush-a4nty6v6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
export SESSION_SECRET="amitasood-real-estate-secret"
export NODE_ENV="production"
echo "Starting application with database connection..."
npm start
