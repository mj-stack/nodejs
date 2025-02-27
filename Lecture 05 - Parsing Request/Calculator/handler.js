const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title>Complete Coding</title>
        </head>
        <body>
          <h1>Welcome to Calculator app</h1>
          <a href="/calculator">
            Calculator
          </a>
        </body>
      </html>
      `);
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title>Complete Coding</title>
        </head>
        <body>
          <h1>Here is the calculator</h1>
          <form action="/calculate-result" method="POST">
            <input type="text" name="first" placeholder="First number"/> 
            <input type="text" name="second" placeholder="Second number"/>
            <input type="Submit" value="Sum"/>
          </form>
        </body>
      </html>
    `);

    return res.end();
  } else if (req.url.toLowerCase() === "/calculate-result" && req.method === 'POST') {
    sumRequestHandler(req, res);
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head>
        <title>Complete Coding</title>
      </head>
      <body>
        <h1>Error 404 : Page not found</h1>
        <a href="/">
          Go to Homepage
        </a>
      </body>
    </html>
  `);
  res.end();
};

exports.requestHandler = requestHandler;
