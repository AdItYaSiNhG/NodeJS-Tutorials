const http = require("http");
const fs = require("fs");

//handling URL's
const url = require('url');


//problem with this occurs that it becomes more confusing and pain for the dev team to maintain the code
//so we use ExpressJS to handle the routing pages
function myHandler(req,res){
    //remove the favicon log
    if(req.url === '/favicon.ico'){
        return res.end();
    }
    //to log the request we can use the following code with ${req.method} ${req.url}
    const log = `${Date.now()}:${req.method} ${req.url} new req received\n`;

    //---------------
    //parse the URL
    const myparsedurl = url.parse(req.url,true);
    console.log(myparsedurl);
    //---------------


    fs.appendFile('log.txt',log,(err,data) => {
        //using switch we can create multi routing pages
        switch(req.url){
            case '/':
                if(req.method === 'GET'){
                    res.end('home page');
                }
                break;
            case '/about': 
                res.end('about page');
                break;

            case '/signup':
                if(req.method === 'GET')
                    res.end('signup form page');
                else if(req.method === 'POST')
                    res.end('signup form submitted');
                break;
            default: 
                res.end('404 page not found');

            /*to handle code structure and maintainability for making 
              routing pages we use ExpressJS*/
        }
    });
}

const myServer = http.createServer(myHandler);



myServer.listen(8000, () => console.log('server started'));