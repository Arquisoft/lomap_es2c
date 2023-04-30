import express, { Application } from 'express'; 
import https from 'https';
import fs from 'fs';

const path = require('path');

const publicPath = path.join(__dirname, '.', 'build');

var app: Application = express();

const HTTPS_PORT = 443;
const HTTP_PORT = 3000;



app.use(express.static("build"));

app.get('*', (req, res) => {    
    res.sendFile(path.join(publicPath, 'index.html')), function(err: any) {             
    if (err) {                 
         res.status(500).send(err) 
         }        
    };
});

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});


if (process.env.NODE_ENV === "production")
{
  const options = {
    cert: fs.readFileSync('/etc/ssl/certs/lomapes2c.eastus.cloudapp.azure.com.crt'),
    key: fs.readFileSync('/etc/ssl/private/lomapes2c.eastus.cloudapp.azure.com.key'),
  };
  
  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`Webapp started on port ${HTTPS_PORT}`);
  }).on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
    });

} else {
    app.listen(HTTP_PORT, () => {
      console.log(`Webapp started on port ${HTTP_PORT} (development)`);
    }).on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
    });
}
  
