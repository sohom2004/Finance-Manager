require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 3001;
const db = "mongodb+srv://sohom2004:"  + process.env.MONGO_PASSWORD + "@cluster1.byifcjg.mongodb.net/financeManager?retryWrites=true&w=majority"

app.use(express.json());
app.use(cors());

mongoose.connect(db).then(()=>console.log("database has been connected")).catch((error)=>console.log("error" + error.message));

app.use(router);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
});