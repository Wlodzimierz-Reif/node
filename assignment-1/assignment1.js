const http = require("http");

const server = http.createServer((req, res) => {
  const test = "blah";
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users page</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Create user debug test</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users Page</title></html>");
    res.write("<body><ul><li>User1</li><li>User2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user") {
    const testmVar = "testvasdsdsd";
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3000);
