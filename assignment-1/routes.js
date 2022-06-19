const routes = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Users page</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='message'><button>Create user</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  } else if ((ulr = "/users")) {
    res.write("<html>");
    res.write("<head><title>Users Page</title></html>");
    res.write(
      "<body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body>"
    );
  }
};

exports.routes = routes;
