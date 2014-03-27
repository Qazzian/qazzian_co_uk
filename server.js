/**
 * Created by Ian on 13/03/14.
 */

var ns = require('node-static'),
    http = require('http'),
    util = require('util');

var webroot = './dist',
    port = 8080;

var file = new(ns.Server)(webroot, {
    cache: 0, // todo dev only
    headers: { 'X-Powered-By': 'node-static' }
});

http.createServer(function(req, res) {
    req.addListener('end', function() {
        file.serve(req, res, function(err, result) {

            if (err) {
                console.error('Error serving %s - %s', req.url, err.message);
								res.writeHead(err.status, err.headers);
                res.end();
            } else {
                console.log('%s - %s', req.url, res.message);
            }
        });
    }).resume();
}).listen(port);

console.log('node-static running at http://localhost:%d', port);