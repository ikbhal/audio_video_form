/*
https://flaviocopes.com/express-https-self-signed-certificate/

openssl req -nodes -new -x509 -keyout server.key -out server.cert
*/
const https = require('https')
const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
  res.send('Hello HTTPS!')
})

https.createServer({
    key: fs.readFileSync('./encryption/server.key'),
    cert: fs.readFileSync('./encryption/server.cert')
  }, app).listen(3000, () => {
    console.log('Listening...')
});