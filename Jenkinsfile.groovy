#!/usr/bin/env groovy

import java.text.SimpleDateFormat

DOCKER_GROUP = 'cwds'
DOCKER_APP_IMAGE = 'coglogin'

SUCCESS_COLOR = '#11AB1B'
FAILURE_COLOR = '#FF0000'

def notify(String tagNumber) {
    def colorCode = currentBuild.currentResult == 'SUCCESS' ? SUCCESS_COLOR : FAILURE_COLOR
    def tagMessage = ''

    slackSend(
        baseUrl: 'https://hooks.slack.com/services/',
        tokenCredentialId: SLACK_CREDENTIALS_ID,
        channel: '#cognito_dev',
        color: colorCode,
        message: "${env.JOB_NAME} #${env.BUILD_NUMBER} - *${currentBuild.currentResult}* after ${currentBuild.durationString}" +
            "${tagMessage}" +
            "\n(Details at ${env.BUILD_URL})"
    )
}

def node_to_run_on() {
  env.NODE_NAME ?: 'cap-slave'
}

node(node_to_run_on()) {
    env.DISABLE_SPRING = 1

    def branch = env.GIT_BRANCH
    def curStage = 'Start'
    def emailList = 'ratnesh.raval@osi.ca.gov'
    def pipelineStatus = 'SUCCESS'
    String newTag = ''

    def appDockerImage

    try {
        deleteDir()
        stage ('Checkout Github') {
            checkout scm

        }

        // build the container from current code
        stage('Build Docker Image') {
            appDockerImage = docker.build("${DOCKER_GROUP}/${DOCKER_APP_IMAGE}:test-${env.BUILD_ID}",
                "-f ./Dockerfile .")
        }

        // run all commands inside container
        appDockerImage.withRun { container ->
            stage('Lint') {
                sh "docker exec -t ${container.id} yarn lint"
            }
            stage('Jest') {
                curStage = 'jest'
                sh "docker exec -t ${container.id} yarn test"
            }
        }

        if (branch == 'master') {
            // build

            // s3 deployment

        }

        stage('Clean Up') {
            sh "docker rmi `docker images ${DOCKER_GROUP}/${DOCKER_APP_IMAGE} --filter 'before=${DOCKER_GROUP}/${DOCKER_APP_IMAGE}:test-${env.BUILD_ID}' -q` -f || true"
            sh "docker rmi `docker images --filter 'dangling=true' -q` -f || true"
        }
    }
    catch (e) {
        pipelineStatus = 'FAILED'
        currentBuild.result = 'FAILURE'
        newTag = ''
    }
    finally {
        // bring all containers down
        // sh "docker-compose -f ./docker/cals-test-bubble/docker-compose.yml down"
        notify(newTag)
    }
}