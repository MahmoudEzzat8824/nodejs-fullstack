pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_NAME = 'nodejs-fullstack'
        // Default MONGO_URI if credential doesn't exist
        MONGO_URI = 'mongodb://localhost:27017/yourDatabase'
        PORT = '5000'
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
PORT=${PORT}
EOF
                    """
                    sh 'cat backend/.env'
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
                    sh 'curl -f http://localhost:5000 || echo "Backend health check failed"'
                    
                    echo 'Checking frontend health...'
                    sh 'curl -f http://localhost:3000 || echo "Frontend health check failed"'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            script {
                echo 'Pipeline failed!'
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} logs || true'
            }
        }
        always {
            script {
                echo 'Cleaning up...'
                sh 'docker system prune -f || true'
            }
        }
    }
}