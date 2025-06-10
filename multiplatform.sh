#!/bin/bash
echo "Building multi-platform"

docker buildx create --name multibuilder --use --bootstrap 2>/dev/null || docker buildx use multibuilder

docker buildx build --platform linux/amd64,linux/arm64 -t angular_frontend:latest --push ./frontend/company-events/

docker buildx build --platform linux/amd64,linux/arm64 -t nest_backend:latest --push ./backend/company-events/

echo "Done building"