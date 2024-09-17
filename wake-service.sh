#!/bin/bash

docker system prune -a -f --volumes
docker network create bigpay-network || true
docker compose -f docker-compose.db.yml up -d
docker compose -f docker-compose.dev.yml up -d --build
