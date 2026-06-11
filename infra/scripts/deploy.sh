#!/bin/bash

set -e

ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}"

echo "Login to ECR..."

aws ecr get-login-password \
--region ${AWS_REGION} | docker login \
--username AWS \
--password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo "Pull latest image..."

docker pull ${ECR_URI}:latest