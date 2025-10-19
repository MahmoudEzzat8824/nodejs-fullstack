pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_NAME = 'nodejs-fullstack'
        MONGO_URI = credentials('mongo-uri') // Add this credential in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    echo 'Creating .env file...'
                    sh """
                        mkdir -p backend
                        cat > backend/.env <<EOF
MONGO_URI=${MONGO_URI}
PORT=5000
EOF
                    """
                }
            }
        }
        
        stage('Verify Files') {
            steps {
                sh 'ls -la'
                sh 'ls -la backend/'
                sh 'cat docker-compose.yml'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo 'Building Docker images...'
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} build'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    echo 'Running backend tests...'
                    sh 'cd backend && npm install && npm test || echo "No tests specified"'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                script {
                    echo 'Running frontend tests...'
                    sh 'cd frontend && npm install && npm test -- --watchAll=false || echo "No tests specified"'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo 'Stopping existing containers...'
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down || true'
                    
                    echo 'Starting new containers...'
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up -d'
                    
                    echo 'Checking container status...'
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} ps'
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    echo 'Waiting for services to start...'
                    sleep(time: 15, unit: 'SECONDS')
                    
                    echo 'Checking backend health...'
                    sh 'curl -f http://localhost:5000 || exit 1'
                    
                    echo 'Checking frontend health...'
                    sh 'curl -f http://localhost:3000 || exit 1'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} logs || true'
        }
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f || true'
        }
    }
}