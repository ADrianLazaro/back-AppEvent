const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const app = express();
const corsOptions={
    origin: 'http://localhost:4200'
};
//config
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//get 

app.use('/api',require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log('Puerto',PORT);
})