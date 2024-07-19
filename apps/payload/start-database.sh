#!/usr/bin/env bash

if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

set -a
source .env


docker run --name $DB_CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -e POSTGRES_DB=next-payload-3 \
    -p 5432:5432 \
    -v payload-pgdata:/var/lib/postgresql/data \
    -d postgres