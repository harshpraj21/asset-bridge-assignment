FROM python:3.9-alpine3.19

ENV PYTHONUNBUFFERED 1
ENV PATH="/py/bin:$PATH"

COPY ./requirements.txt /tmp/requirements.txt
COPY ./app /app

WORKDIR /app
EXPOSE 8000

ARG DEV=false

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev && \
    /py/bin/pip install -r /tmp/requirements.txt  && \
    rm -rf /tmp && \
    apk del .tmp-build-deps