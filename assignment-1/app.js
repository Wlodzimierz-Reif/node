const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log("server is running");
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
});

server.listen(3000);
