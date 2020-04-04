# Suggestion - new project struct
```
├─client               # frontend source folder
│  ├─build             # frontend dev scripts
│  ├─src               # frontend src
│  │  ├─assets
│  │  │  ├─css
│  │  │  ├─fonts
│  │  │  └─images
│  │  ├─components     # vue components
│  │  ├─http           # vue-resource configuration
│  │  ├─locale         # vue-i18n configuration
│  │  ├─router         # vue-router configuration
│  │  ├─socket         # socket.io configuration
│  │  ├─storage        # web storage api
│  │  ├─store          # vuex store
│  │  │  └─modules
│  │  └─view           # app pages
│  │     └─auth
│  └─static            # static folder
├─mock                 # mock server
│  ├─ajax              # ajax mock configs
│  ├─socket            # socket.io mock configs
└─server               # backend server folder
    ├─api              # backend api list
    │  ├─thing
    │  └─user
    ├─auth             # user auth logical
    │  └─local
    ├─components       # server components
    │  └─errors
    ├─config           # server configs, contains express socket.io, etc.
    └─views            # server served pages
``` 
