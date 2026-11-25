pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    triggers {
        cron('0 */2 * * *')
    }

    stages {
        stage('Checkout and install') {
            steps {
                git branch: 'setup-jenkins', url: 'https://github.com/HannaZarazheuskaya/Module4-WDIO-Mocha-Chai'
                bat 'npm ci'
            }
        }

        stage('Run eslint and prettier') {
            steps {
                bat 'npm run lint'
                bat 'npm run format'
            }
        }

        stage('Run tests') {
            parallel {
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
