var http = require('http')
var dispatcher = require('httpdispatcher')
var port = parseInt(process.argv[2])
var http = require('http')


dispatcher.onGet('/', function (req, res) {
    res.end("Invoked service 4")
})

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
