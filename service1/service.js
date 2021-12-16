var dispatcher = require('httpdispatcher')
var port = parseInt(process.argv[2])
var http = require('http')
var svc1 = '';
var svc2 = '';

dispatcher.onGet('/home', function (req, resp) {
  http.get('http://service2', res => {
    res.on('data', d => {
      svc1 = svc1 + d + '\n\n';
      http.get('http://service3', res => {
        res.on('data', d => {
        svc2 = svc2 + d + '\n\n';
        resp.end(svc1 + svc2);
        svc1 = '';
        svc2 = '';
        });
      });
    });
  });
});

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end();
    });

function handleRequest (request, response) {
  try {
    console.log(request.method + ' ' + request.url)
    dispatcher.dispatch(request, response)
  } catch (err) {
    console.log(err)
  }
}

var server = http.createServer(handleRequest)

server.listen(port, function () {
  console.log('Server listening on: http://0.0.0.0:%s', port)
})

