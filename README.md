# Company Events Platform

A comprehensive platform for managing company events, built with modern technologies and designed for scalability.

## Project Overview

The Company Events Platform is a full-stack application that allows companies to manage their internal events. It provides features for creating, updating, and deleting events, as well as collecting feedback from attendees.

### Key Features

- Event management (create, read, update, delete)
- User authentication and authorization
- Feedback collection and analysis
- Room management for events
- Responsive design for desktop and mobile

## Architecture

The application follows a microservices architecture with the following components:

### Backend Services

- **Main Backend Service**: NestJS application that handles event management

### Frontend

- **Angular Application**: Modern Angular application with responsive design

### Authentication

- **Keycloak**: Open-source Identity and Access Management solution

### Databases

- **PostgreSQL**: Main database for the application
- **Keycloak Database**: Separate PostgreSQL instance for Keycloak

### Infrastructure

- **Docker**: Containerization for local development and production
- **Kubernetes**: Orchestration for production deployment
- **Nginx**: Reverse proxy for routing requests

## Deployment Options

### Docker Deployment

The application can be easily deployed using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/yourusername/company-events.git
cd company-events

# Create .env file (or use the provided example)
cp .env.example .env

# Start the application
docker-compose up -d
```

### Kubernetes Deployment

For production environments, the application can be deployed to Kubernetes:

```bash
# Apply Kubernetes configurations
kubectl apply -f kubernetes/

# Check the status of the pods
kubectl get pods
```

The Kubernetes deployment includes:
- Deployments for all services
- Services for internal communication
- Persistent volumes for databases
- Horizontal Pod Autoscalers for scalability
- Ingress for external access

## Authentication with Keycloak

The application uses Keycloak for authentication and authorization:

1. Keycloak is configured with a realm called "events-realm"
2. The backend services are registered as clients in Keycloak
3. The frontend uses Keycloak's JavaScript adapter for authentication
4. JWT tokens are used for securing API endpoints


### Environment Variables

The application uses environment variables for configuration. See the `.env` file for details.

## Pictures

<img width="1263" alt="image" src="https://github.com/user-attachments/assets/ac5e4063-efd5-443e-8244-47b2a13ec2b4" />
<img width="1292" alt="image" src="https://github.com/user-attachments/assets/8ec5d06a-2dee-4d48-9486-6e4428cd4481" />




