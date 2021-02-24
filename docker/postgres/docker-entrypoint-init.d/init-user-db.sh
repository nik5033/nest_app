#!/bin/bash

set -e

psql --username postgres <<-EOSQL
    CREATE USER ${POSTGRES_USER} WITH ENCRYPTED PASSWORD '${POSTGRES_PASSWORD}';
    CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};
EOSQL