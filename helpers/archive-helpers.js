var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

paths = exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites/'),
  'index': path.join(__dirname, '../web/public/index.html'),
  'loading': path.join(__dirname, '../web/public/loading.html'),
  'siteQ': path.join(__dirname, '../archives/siteQ.txt'),
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(file, callback){
  fs.readFile(file, function(err, data){
    if(err){throw err;}
    callback(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(){
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(callback, list, url){

};

exports.downloadUrls = function(){
};
