import mongoose from "mongoose";

const CategoriesDataSchema = new mongoose.Schema({
    catID: {
        type: String,
        required: true,
        unique: true
    },
    introduction: {
        type: Object,
        required: true
    },
    relatedCourses: {
        type: Object,
        required: true
    },
    recommendedCourses: {
        type: Object,
        required: true
    }
});

const CategoriesDataModel = mongoose.models.CategoriesData || mongoose.model('CategoriesData', CategoriesDataSchema);

export default CategoriesDataModel;