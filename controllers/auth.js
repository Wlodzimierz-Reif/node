const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // console.log(req.get("Cookie"));
  //   const isLoggedIn =
  //     req.get("Cookie").split(";")[0].trim().split("=")[1] === "true";
  // console.log(req.session.isLoggedIn);

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // we don't want to use cookies for this porpose. Use session instead
  // req.session.isLoggedIn = true; // we can't use that as after sendig response the request is done and its values are gone too
  //   res.setHeader("Set-Cookie", "loggedIn=true"); // this way we set the cookie in the server and it can be used with every request

  User.findById("63103d2300a49b7e27cb2d59") // now it's mongoose method
    .then((user) => {
      // that instead of req.user = user gives me class of User that I can use all User methods on instead of just data
      // req.user = new User(user.name, user.email, user.cart, user._id); // now we can use the fetched user in our app
      req.session.user = user; // it's Mongoose way to use "User" model
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        // I need to use it as creating session in MongoDB takes some time and otherwise I end up redirecting before the session was created.
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/");
};
