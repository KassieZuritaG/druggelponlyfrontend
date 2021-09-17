/*Install express server    
const express = require('express');

const path = require('path');   

const app = express();   

// Serve only the static files form the dist directory    
app.use(express.static(__dirname + '/app'));

app.get('/*', function(req,res) {  
    res.sendFile(path.join('https://shop-druggelp.herokuapp.com'));   
});  

// Start the app by listening on the default Heroku port    
app.listen(process.env.PORT || 8080);*/


var Request = require("request");

Request.get("https://shop-druggelp.herokuapp.com", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});

