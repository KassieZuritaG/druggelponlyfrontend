//Install express server    
const express = require('express');

const path = require('path');   

const app = express();   

// Serve only the static files form the dist directory    
app.use(res.redirect('https://shop-druggelp.herokuapp.com/'));

/*
/*app.get('/*', function(req,res) {  
    res.sendFile(path.join('https://shop-druggelp.herokuapp.com/'+__dirname));   
}); 

app.get('/*', function(req,res) {  
    res.sendFile(path.join('https://shop-druggelp.herokuapp.com/'+__dirname));   
}); 

// Start the app by listening on the default Heroku port    
app.listen(process.env.PORT || 8080);
//app.listen(process.env.PORT || 4200);

*/


