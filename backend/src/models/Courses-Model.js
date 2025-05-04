import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    courseID: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    introduction: {
        type: Array,
        required: true,
    },
    prerequisites: {
        type: Array,
        required: true,
    },
    subjects: {
        type: Array,
        required: true
    },
    jobRoles: {
        type: Array,
        required: true,
    },
    recommendedColleges: {
        type: Array,
        required: true
    }
});

const CoursesModel = mongoose.models.Courses || mongoose.model('Courses', CourseSchema);

export default CoursesModel;