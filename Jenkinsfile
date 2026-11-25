pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    triggers {
        cron('0 */2 * * *')
    }

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run eslint and prettier') {
            steps {
                bat 'npm run lint:cucumber'
                bat 'npm run format'
            }
        }

        stage('Run tests') {
            stages {
                stage('Job 1: Cucumber tests') {
                    steps {
                        bat 'npm run test:cucumber'
                    }
                }
            }
        }                
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
            publishHTML(target: [
                reportDir: 'reports/cucumber-reports',
                reportFiles: '*.html',
                reportName: 'Cucumber Test Report'
            ])
        }
    }
}
