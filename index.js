console.log("WORKING WELL");

const express = require('express');
const app = express();
const routes=require('./config/routes')
const port = 8080;



app.use(express.json())
app.use(express.urlencoded({extended:true}))
  

// arquivos estáticos
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/imgs'));

app.use(routes);



app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`);
});




