import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { errorMiddleware } from './middlewares/error-middleware.js';
import { dbConnect } from './config/dbConnect.js';
import CategoriesRouter from './routes/categories-rotuer.js';

const app = express();
const PORT = 8800;

//cors for connecting frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD'
}));


//middlewares
app.use(express.json());

//error-middleware
app.use(errorMiddleware);

//categories data and list api endpoint
app.use('/api/categories', CategoriesRouter)


//first DB will connect and then app server will run.
dbConnect().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
