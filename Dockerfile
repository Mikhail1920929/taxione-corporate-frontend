## Builder
FROM gliderlabs/herokuish:master as builder
COPY . /tmp/app

ENV USER=herokuishuser
ARG APP_PORT=5000
ENV PORT ${APP_PORT}
ENV APP_PORT ${APP_PORT}

# Quasar settings
ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}

ARG BACKEND_URL
ENV BACKEND_URL ${BACKEND_URL}
RUN /bin/herokuish buildpack build

EXPOSE ${APP_PORT}

CMD ["/bin/herokuish", "procfile", "start", "web"]
