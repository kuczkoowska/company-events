#!/bin/bash
echo "Building multi-platform"

docker buildx build --platform linux/amd64,linux/arm64 -t docker.io/kuczkoowska/company-events-backend:dev --push backend/company-events
docker buildx build --platform linux/amd64,linux/arm64 -t docker.io/kuczkoowska/company-events-frontend:dev --push frontend/company-events
docker buildx build --platform linux/amd64,linux/arm64 -t docker.io/kuczkoowska/company-events-feedback:dev --push backend/feedback

echo "Done building"