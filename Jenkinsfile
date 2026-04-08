pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Hemanth-TT/Playwright_api_test'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }git

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results -o allure-report --clean'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
        success {
            echo 'Build passed'
        }
        failure {
            echo 'Build failed'
        }
    }
}