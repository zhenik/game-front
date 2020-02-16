# Game-front

## Required software
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable), if you use macOS, install it via package manager `brew`
* [Vue cli](https://cli.vuejs.org/guide/installation.html), install via yarn
```bash
yarn global add @vue/cli
```
* in some cases install `node`, via package manager `brew`


## How to run 
```bash
yarn run dev
```

## Instant prototyping
Component must be decoupled from application. Other requirements:
- No access to application logic files: store, routing, service, etc..
- Access only to other ui component

example:
```bash 
vue serve ./src/components/lists/index.vue
```
Component view is available on `http://localhost:8081`

