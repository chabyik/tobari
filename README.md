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

You must issue an SSL certificate to ensure a secure connection. For apply your SSL certificate to this application, follow these steps:

1. Create a Docker volume: `letsencrypt`.
    - For example, you can use this command: `docker volume create letsencrypt`
2. Set up [certbot](https://certbot.eff.org/) in the Docker container environment connected with the above volumes.
    - To manually issue an SSL certificate with DNS-01 challenge, you can use this command: `docker run -it --rm --name certbot -v letsencrypt:/etc/letsencrypt certbot/certbot certonly -d 'yourdomain.com' --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory`
3. Lastly, turn on the server.