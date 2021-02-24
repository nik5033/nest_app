FROM postgres:latest

COPY ./docker-entrypoint-init.d/init-user-db.sh /docker-entrypoint-init.d/init-user-db.sh
RUN chmod +x /docker-entrypoint-init.d/init-user-db.sh