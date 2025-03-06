const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.headers, req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body><h1>Enter Your Details:</h1>");
    res.write("<form action='/submit-details' method='POST'>");
    res.write("<input type='text' name='username' placeholder='Enter username' /><br />");
    res.write("<label for='gender'>Gender:</label><br />");
    res.write("<input type='radio' id='male' name='gender' value='male' />");
    res.write("<label for='male'>Male</label>");
    res.write("<input type='radio' id='female' name='gender' value='female' />");
    res.write("<label for='female'>Female</label><br />");
    res.write("<input type='submit' value='Submit' /><br />");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if(req.url.toLowerCase() === '/submit-details' && req.method === 'POST') {
    fs.writeFileSync('user.txt', 'Mukul Joshi');
    res.statusCode = 302;
    res.setHeader('Location', '/');  
  }

  res.write("<html>");
  res.write("<head><title>Complete Coding</title></head>");
  res.write("<body><h1>Like share and subscribe</h1></body>");
  res.write("</html>");
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
});
