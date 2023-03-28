const http = require('http'); //*Import module http
const fs = require('fs'); //*Import module file system

// function rqListener(request, response) {

// }
// http.createServer(rqListener);

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type ="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end(); //AFter this, we exit the function
  }

if (url === '/message' && method === 'POST'){
  const body = [];
    req.on('data', (chunk) => { //Listener that allows to listen an event, the event is data
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {//Listener fired once it's done parsing the incoming data or the incoming requests
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt',message);
    });
    res.statusCode = 302;
    res.setHeader('location', '/' );
    return res.end();

}

  res.setHeader('Content-Type', 'text/html');
  // res.write();//write some data to the response
  res.write('<html>');
  res.write('<head><title>My First Page </title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
  res.write('</html>');
  res.end();//You can't write anymore after this one
  
  // console.log(req.url, req.method, req.headers);
});

server.listen(8000);
