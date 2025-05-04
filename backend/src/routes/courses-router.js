import express from 'express';
import { addCourse, getCourse } from '../controllers/course-controllers.js';

const CoursesRouter = express.Router();

//route for getting getting course
CoursesRouter.get('/getcourse/:courseID', getCourse);

//route for adding course
CoursesRouter.post('/addcourse', addCourse);

export default CoursesRouter;