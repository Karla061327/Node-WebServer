
import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('C:\\Users\\kpmar\\server.key'),
    cert: fs.readFileSync('C:\\Users\\kpmar\\server.crt'),
},(req, res) => {
    
    console.log('req.url');
    
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.writBe('<h1>Hola</h1>');
    // res.end();

//     const data = { name: 'karla', age:25};
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.end(JSON.stringify(data));
 
    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlFile);
        return;
    }
    if (req.url?.endsWith('.js')){
        res.writeHead(200, {'Content-Type': 'application/javascript'});
    }else if (req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'application/javascript'});
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
    } catch (error) {
        
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end();
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
 })

    server.listen (8081, () => {
        console.log('Server running ...');
})