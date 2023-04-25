import express, { Application } from 'express'; 
import cors from 'cors';
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app: Application = express();
const port: number = 3000;

app.use(express.static("build"));

app.use(cors()); 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  next();
});



app
  .listen(port, (): void => {
    console.log("Webapp started on port " + port);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });
