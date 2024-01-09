import express from 'express'
import cors from 'cors'
import routes from './routes/main.routes.js';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use("/api",routes)
const PORT = 8000;





app.listen(PORT,() => console.log('Server is Running'))