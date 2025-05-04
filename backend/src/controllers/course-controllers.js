import CoursesModel from "../models/Courses-Model.js"


//getting courses api endpoint
export const getCourse = async (req, res, next) => {

    try {
        
        const getCourseData = await CoursesModel.findOne({courseID: req.params.courseID});
        res.status(200).json({success: true, getCourseData});
        
    } catch (err) {

        const error = {
            status: 404,
            msg: "Course Not Found"
        }
        next(error)
        
    }
} 

//getting courses api endpoint
export const addCourse = async (req, res, next) => {

    try {

        const addCourseData = await CoursesModel.create(req.body);
        res.status(200).json({success: true, addCourseData});
        
    } catch (err) {
        const error = {
            status: 417,
            msg: "Course Not Added",
        };
        next(error);
    }
} 