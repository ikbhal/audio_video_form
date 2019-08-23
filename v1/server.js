const express = require('express');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const path = require('path');
const moment = require('moment');

var app = express();
//app.use(express.static(__dirname));
app.use(express.static("public"));

app.post('/video', upload.any(), (req, res) => {
    console.log('POST /video');
    console.log('Files: ', req.files);
    var fileName = moment().format("YYYY-MM-DD-HH-MM-SS-x")+".webm";
    fs.writeFile(path.resolve(__dirname , "public/uploads/", fileName), req.files[0].buffer, (err) => {
        if (err) {
            console.log('Error: ', err);
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

app.listen(process.env.PORT || 3000);