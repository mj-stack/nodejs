const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if(req.url === '/') {
    res.write('<html>')
    res.write('<title>Myntra</title>')
    res.write('<body>')
    res.write('<h1>Welcome to myntra home page</h1>')
    res.write('<a href="/">Home</a><br />')
    res.write('<a href="/men">Men</a><br />')
    res.write('<a href="/women">Women</a><br />')
    res.write('<a href="/kids">Kids</a><br />')
    res.write('<a href="/cart">Cart</a>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  } else if(req.url === '/men') {
    res.write('<html>')
    res.write('<title>Myntra</title>')
    res.write('<body>')
    res.write('<h1>Welcome to myntra mens page</h1>')
    res.write('<a href="/">Home</a><br />')
    res.write('<a href="/men">Men</a><br />')
    res.write('<a href="/women">Women</a><br />')
    res.write('<a href="/kids">Kids</a><br />')
    res.write('<a href="/cart">Cart</a>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  } else if(req.url === '/women') {
    res.write('<html>')
    res.write('<title>Myntra</title>')
    res.write('<body>')
    res.write('<h1>Welcome to myntra womens page</h1>')
    res.write('<a href="/">Home</a><br />')
    res.write('<a href="/men">Men</a><br />')
    res.write('<a href="/women">Women</a><br />')
    res.write('<a href="/kids">Kids</a><br />')
    res.write('<a href="/cart">Cart</a>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  } else if(req.url === '/kids') {
    res.write('<html>')
    res.write('<title>Myntra</title>')
    res.write('<body>')
    res.write('<h1>Welcome to myntra kids page</h1>')
    res.write('<a href="/">Home</a><br />')
    res.write('<a href="/men">Men</a><br />')
    res.write('<a href="/women">Women</a><br />')
    res.write('<a href="/kids">Kids</a><br />')
    res.write('<a href="/cart">Cart</a>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  } else if(req.url === '/cart') {
    res.write('<html>')
    res.write('<title>Myntra</title>')
    res.write('<body>')
    res.write('<h1>Welcome to myntra cart page</h1>')
    res.write('<a href="/">Home</a><br />')
    res.write('<a href="/men">Men</a><br />')
    res.write('<a href="/women">Women</a><br />')
    res.write('<a href="/kids">Kids</a><br />')
    res.write('<a href="/cart">Cart</a>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  } 

  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
})