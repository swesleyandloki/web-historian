// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http-request');

var hollaback = function(urls){
  fs.writeFile(archive.paths.siteQ, '', function(err){
    if(err){throw err;}
  })
  urls.forEach(function(url){
    http.get(
      {
        url: url,
        progress: function (current, total) {
          console.log('downloaded %d bytes from %d', current, total);
        }
      },
      archive.paths.archivedSites+url, function (err, res) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  })
}

archive.readListOfUrls(archive.paths.siteQ, hollaback);
