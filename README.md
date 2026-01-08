# Task Manager App

A full-stack task management application with user authentication, monitoring, and Kubernetes support. Built with React, Node.js, Express, and MongoDB.

## Features

- User signup/login with JWT authentication
- Create, edit, and delete tasks
- Set priority levels and due dates
- Filter tasks by status
- View task statistics
- Real-time monitoring with Prometheus and Grafana
- Production-ready Kubernetes deployments

## Run Locally

### Prerequisites

- Docker and Docker Compose installed on your machine

### Steps

1. Clone the repository:
```bash
git clone https://github.com/mahmoudezzat8824/nodejs-fullstack.git
cd nodejs-fullstack
```

2. Start the application with monitoring:
```bash
docker compose up --build -d
```

3. Access the services:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3001 (admin/admin)
   - **Node Exporter**: http://localhost:9100/metrics

4. To stop the application:
```bash
docker compose down
```

## Monitoring

The application includes a complete monitoring stack:

- **Prometheus** - Metrics collection and storage
- **Grafana** - Visualization dashboards (pre-configured)
- **Node Exporter** - System and host metrics

## Kubernetes Deployment

Quick deploy:
```bash
# Create secret with your MongoDB URI
kubectl apply -f k8s/secret.yaml

# Deploy ConfigMaps
kubectl apply -f k8s/configmap.yaml

# Deploy all services
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## Project Structure

```
├── backend/              # Node.js Express API
├── frontend/             # React application
├── monitoring/           # Prometheus & Grafana configs
│   ├── prometheus.yaml   # Prometheus configuration
│   └── grafana/          # Grafana provisioning
├── k8s/                  # Kubernetes manifests
├── docker-compose.yml    # Local development setup
└── README.md
```

## Technology Stack

- **Frontend**: React, Context API
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, bcryptjs
- **Monitoring**: Prometheus, Grafana, Node Exporter
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes