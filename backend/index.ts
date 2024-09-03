import express from 'express';
import cors from 'cors';
import { connectToMongoDB } from './connectToMongo';


connectToMongoDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())

app.use('/api/user', require('./routes/user'));

app.listen(PORT, () => { 
    console.log(`Server listen to http://localhost:${PORT}`);
})