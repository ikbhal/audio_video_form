/*
Reference: https://contextneutral.com/story/creating-an-https-server-with-nodejs-and-express

openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key
Use the .csr to generate your certificates and save the generated certificate files (.crt) and the private.key file in a directory in the root (say encryption)
*/

var express = require('express');
var app = express();

app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

var fs = require('fs');

var key = fs.readFileSync('encryption/private.key');
var cert = fs.readFileSync( 'encryption/primary.crt' );
var ca = fs.readFileSync( 'encryption/intermediate.crt' );

var options = {
    key: key,
    cert: cert,
    ca: ca
    };

var https = require('https');
https.createServer(options, app).listen(443);
