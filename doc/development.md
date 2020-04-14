# Development

## Prerequisites
* docker
* docker-compose
* makefile
* [postman](https://www.postman.com/)
* firebase credentials

`!NB` You can use existing project credentials or create new one. 
Credentials must lie down in `/src/firebase.js`. There is example in `firebase-example.js`.  

## How to run db and backend
Execute from project's root
`make dev`

`!NB` check Makefile for full set of commands.

## Before interaction
* Open postman and import [postman collection](https://www.getpostman.com/collections/773a9544c72bb200bf09)
* Create env 
 
![img](./pic/vars.png)

## Postman collection 
Postman collection is collection of requests to communicate with backend system.
Backend system is REST application.

`GET`     -> fetch   
`POST`    -> create  
`PUT`     -> replace  

When first run you need to create at least one user, that you can assign list to that user.
Folders `list`, `user` and `analytics` are to interact with system.
Folder data contains request for development.  


