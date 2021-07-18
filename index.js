const express =require('express');
const app = express();

const routes=require('./routes/send');
//env
const dotenv=require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

//routes

app.use(express.json());
app.use(routes);

// Handling Errors


//listen port
app.listen(port,() => console.log("Server is running!"));
