pipeline {
    agent any
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['QA', 'UAT', 'PROD'], description: '')
    }
    environment {
        NEW_VERSION = '1.0.0'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building version ${NEW_VERSION}"
                echo "Building environment ${params.ENVIRONMENT}"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
             }
        }
    }

    post {
        always {
            slackSend channel: 'deployment', message: "Deploying ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BUILD_URL} STATUS: ${currentBuild.currentResult}"
        }
    }
}