import express from 'express';
import cors from 'cors';
import { connectToMongoDB } from './connectToMongo';

connectToMongoDB();

const app = express();
const PORT = 5000;

app.use(cors
(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["content-type", "authToken"]
    }
));

app.use(express.json())
app.use('/api/user', require('./routes/user'));
app.use('/api/book', require('./routes/books'));

app.listen(PORT, () => 
{ 
    console.log(`Server listen to http://localhost:${PORT}`);
})