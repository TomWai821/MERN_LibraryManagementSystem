import express from 'express';

const connect = require('./connectToMongo');
var cors = require('cors');

connect();

const app = express();
const port:number = 5000;

app.use(cors);
app.use(express.json())

app.use('api/user', require('./routes/user'));
app.use('api/note', require('./routes/note'));


app.listen(port, () => 
    { 
        console.log(`listen to http://localhost:${port}`)
    }
)