# Auth Guard
Backend application to verify tokens.
Firebase admin sdk under the hood.
## Config
Require firebase admin credentials, could be generated in firebase console.
Credentials should be stored in file and mounted to container.
 
Credentials example `project-credentials.json`
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```
Mount file with credentials   
`"./auth-guard/project-credentials.json:/usr/src/app/project-credentials.json"`
