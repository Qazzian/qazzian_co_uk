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
                if (err.status === 404 || err.status === 500) {
                    file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
                } else {
                    res.writeHead(err.status, err.headers);
                    res.end();
                }
            } else {
                console.log('%s - %s', req.url, res.message);
            }
        });
    }).resume();
}).listen(port);

console.log('node-static running at http://localhost:%d', port);