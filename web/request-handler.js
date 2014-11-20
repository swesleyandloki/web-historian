var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers')
var fs = require('fs');
// require more modules/folders here!
var headers = helpers.headers

exports.handleRequest = function (req, res) {
  types[req.method](req, res);
  // res.end(archive.paths.list);
};

var types = {
  GET: function(req,res) {
    var parsedUrl = url.parse(req.url);
// Serves up index at root path
    if (parsedUrl.path === '/') {
      res.writeHead(200, headers);
      fs.readFile(archive.paths.index, function(err, data){
        if(err){throw err;}
        res.end(data);
      });
    } else {
// GET at any other than root path - checks for file
      fs.readFile(archive.paths.archivedSites+parsedUrl.path, function(err, data){
        if(err){
// Returns 404 if website file is not in archives
          res.writeHead(404, headers);
          res.end('nice try!')
          // throw err;
          return;
        }
// Serves up archived website file
        res.writeHead(200, headers);
        res.end(data);
      });
    }
  },
  POST: function(req,res) {
    var parsedUrl = url.parse(req.url);
    fs.readFile(archive.paths.archivedSites+parsedUrl.path, function(err, data){
//REQ._POSTDATA.URL NEEDS TO BE CHANGED TO ACTUAL REQUEST DATA
      if(err){
        fs.appendFile(archive.paths.list, req._postData.url + '\n', function (err) {
          if(err){throw err;}
        });
        res.writeHead(302, headers);
        res.end('nice try!')
        // throw err;
        return;
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  },
  OPTIONS: function(req,res) {

  },
  OTHER: function(req,res) {

  }
}
