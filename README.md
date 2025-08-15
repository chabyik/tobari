# tobari

This is the control panel for my AWS server. [WIP]

## 1. Requirements

You need to install [Docker](https://www.docker.com) with [Docker Compose Plugin](https://docs.docker.com/compose/install/).

## 2. Installation

1. Download this repository.
2. Modify the contents of all `Dockerfile` and each `*.sample` files as appropriate to suit your situation.
3. Remove '.sample' from each file name.
4. Run `docker-compose up` at the project directory.

## 3. For SSL Support

You must issue a SSL certificate to ensure a secure connection. For apply your SSL certificate to this application, follow these steps:

1. Create two Docker volumes: `letsencrypt`, `certbot`.
2. Set up [certbot](https://certbot.eff.org/) in a Docker container connected with the above volumes.
3. Lastly, turn the server on.