# Introduction
Hello there! If you see this, this is just a repository for me to test out this Web Server I made with NodeJS with the ability to detect if pages are in this directory or nested directory based on the URL and render them 😎. Feel free to checkout my other projects 😎

[Repositories](https://github.com/DeonteHorton?tab=repositories)

## Docker installation
If you have docker downloaded and want to run the files I have in this repository. You'll have to run these commands to have it up to play around with

### Pull the docker image

`docker pull node`

### Create the docker container using the docker compose yaml file

`docker compose up -d`

### SSH / Entering the Node container through exec

`docker exec -it node_js bash`

### After that, you can start the server by using the command below

`node index.js`

## If you don't have docker installed
You can download NodeJS from their [website](https://nodejs.org/en), following the steps after downloading the executable.