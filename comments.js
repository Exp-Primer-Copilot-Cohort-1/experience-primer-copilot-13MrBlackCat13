// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function (req, res) {
  fs.readFile(filePath, function (err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function (req, res) {
  fs.readFile(filePath, function (err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(filePath, JSON.stringify(comments, null, 2), function (err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});