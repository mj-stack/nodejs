const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('First middleware', req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log('Second middleware', req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log('Response middleware', req.url, req.method);
  res.send(`
    <h1>Welcome to my page</h1>
    <a href="/contact-us">Contact Us</a>
  `);
});

app.get("/contact-us", (req, res, next) => {
  console.log('Response middleware', req.url, req.method);
  res.send(`
    <h1>Contact us</h1>
    <h2>Enter your details below</h2>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <input type="submit" />
    </form>
  `);
});

app.post("/contact-us", (req, res, next) => {
  console.log('response received');
  res.send(`
    <h1>Form submitted... Thank you!!!</h1>
    <a href="/">Back to homepage</a>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is now live');
})