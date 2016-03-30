#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var copy = require('cpr');

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

var dirPath = path.join('/', 'usr', 'local', 'var', 'cozy', 'tiddlywiki5');
var isInfoFile = fs.existsSync(path.join(dirPath, 'tiddlywiki.info'));
var port = process.env.PORT || "9444";


function init(callback) {
  var opts = {
    overwrite: true,
    confirm: true
  };
  copy('./editions/server', dirPath, opts, function (err) {
    if (err) return callback(err);
  });
}


/* Simulation of a proper command line call:
 *
 *     node server.js --server <port> <roottiddler> <rendertype> <servetype>
 *     <username> <password> <host> <dirPathprefix>
 * */
function startServer() {
  process.chdir(dirPath);
  process.argv = process.argv.concat([
    dirPath,
    '--server',
    port, // port
    '$:/core/save/all', // roottidler
    'text/plain', // rendertype
    'text/html', // servertype
    '', // username, nothing, auth is handled by Cozy
    '', // password, nothing auth is handled by Cozy
    '127.0.0.1', // host
    ""
  ]);
  var url = "http://127.0.0.1:" + port + "/apps/tiddlywiki5/";
  console.log(url);
  $tw.boot.argv = Array.prototype.slice.call(process.argv, 2);
  $tw.boot.boot();
  $tw.wiki.addTiddler(new $tw.Tiddler({
    title: "$:/config/tiddlyweb/host",
    text: url
  }));
}

if (isInfoFile) {
  console.log('Info file exists');
  startServer();
} else {
  console.log('Info file does not exist. Init is required.');
  init(function (err) {
    if (err) {
      console.log('Init failed.');
      console.log(err);
    } else {
      console.log('Init is done.');
      startServer();
    }
  });
};

