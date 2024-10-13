pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '975050024946' // Replace with your AWS account ID
        REGION = 'eu-north-1' // Replace with your AWS region
        ECR_REPO_BACKEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/mean_backend"
        ECR_REPO_FRONTEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/mean_frontend"
        GIT_CREDENTIALS = 'github_jenkins_id' // Replace with your GitHub credentials ID in Jenkins
        AWS_CREDENTIALS = 'aws-jenkins-credentials-id' // Replace with your AWS credentials ID in Jenkins
        BRANCH = 'main' // Ensure this is the correct branch in your repository
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs() // Cleans the workspace to avoid issues with pre-existing files
            }
        }

        stage('Checkout Code') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: GIT_CREDENTIALS, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASSWORD')]) {
                        echo "Cloning repository..."
                        git branch: BRANCH, credentialsId: GIT_CREDENTIALS, url: 'https://github.com/PankajGacche/ResumeAI.git'

                        // Debugging: List files to check repository structure
                        sh 'ls -la'
                        sh 'ls -la ResumeAI'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Building the backend Docker image
                    docker.build('backend', './ResumeAI/ResumeBuilderBackend')

                    // Building the frontend Docker image
                    docker.build('frontend', './ResumeAI/ResumeBuilderAngular')
                }
            }
        }

        stage('Push Docker Images to ECR') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: AWS_CREDENTIALS]]) {
                        // AWS ECR login
                        sh '''
                        aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO_BACKEND
                        aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO_FRONTEND
                        '''

                        // Tagging and pushing the backend Docker image
                        sh '''
                        docker tag backend:latest $ECR_REPO_BACKEND:latest
                        docker push $ECR_REPO_BACKEND:latest
                        '''

                        // Tagging and pushing the frontend Docker image
                        sh '''
                        docker tag frontend:latest $ECR_REPO_FRONTEND:latest
                        docker push $ECR_REPO_FRONTEND:latest
                        '''
                    }
                }
            }
        }
    }

    post {
        cleanup {
            cleanWs() // Clean workspace after the build
        }
    }
}
