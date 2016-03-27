#!/usr/bin/env node
var fs = require('fs');

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

var path = '/usr/local/var/cozy/tiddlywiki5/';
var items = fs.readdirSync(path);

var port = process.env.PORT || "9444";


function init() {
  process.argv.push(path);
  process.argv = process.argv.concat([
    '--init',
    'server'
  ]);

  $tw.boot.argv = Array.prototype.slice.call(process.argv, 2);
  $tw.boot.boot();
  process.argv = process.argv.slice(0, 2);
}


/* Simulation of a proper command line call:
 *
 *     node server.js --server <port> <roottiddler> <rendertype> <servetype>
 *     <username> <password> <host> <pathprefix>
 * */
function startServer() {
  process.chdir(path);
  process.argv = process.argv.concat([
    path,
    '--server',
    port, // port
    '$:/core/save/all', // roottidler
    'text/plain', // rendertype
    'text/html', // servertype
    '', // username, nothing, auth is handled by Cozy
    '', // password, nothing auth is handled by Cozy
    '127.0.0.1', // host
    '/apps/tiddlywiki5' // pathprefix
  ]);
  $tw.boot.argv = Array.prototype.slice.call(process.argv, 2);
  $tw.boot.boot();
  $tw.wiki.addTiddler(new $tw.Tiddler({
    title: "$:/config/tiddlyweb/host",
    text: "http://127.0.0.1/apps/tiddlywiki5"
  }));
}

if(items.length > 0) {
  startServer();
} else {
  init();
  startServer();
};

