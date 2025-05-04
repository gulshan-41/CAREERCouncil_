import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config'
import { errorMiddleware } from './src/middlewares/error-middleware.js';
import { dbConnect } from './src/config/dbConnect.js';
import CategoriesRouter from './src/routes/categories-router.js';
import CoursesRouter from './src/routes/courses-router.js';

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
app.use(morgan('tiny'));

//categories data and list api startpoint
app.use('/api/categories', CategoriesRouter)

//courses api startpoint
app.use('/api/course', CoursesRouter);

//error-middleware
app.use(errorMiddleware);

//first DB will connect and then app server will run.
dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
