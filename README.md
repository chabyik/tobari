# tobari

This is the control panel for my AWS server. [WIP]

## 1. Requirements

You need to install [Docker](https://www.docker.com) with [Docker Compose Plugin](https://docs.docker.com/compose/install/).

## 2. Installation

1. Download this repository.
2. Modify the contents of all `Dockerfile` as appropriate.
3. Find the `.sample.env`, `nginx.sample.conf` and `config.sample.json` files.
4. Modify the contents of each file as appropriate.
5. Remove '.sample' from each file name.
6. Run `docker-compose up` at the project directory.