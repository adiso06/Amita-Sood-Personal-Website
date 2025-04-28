#!/bin/bash
echo "Seeding the database with sample data..."
curl -X POST http://localhost:3000/api/seed
