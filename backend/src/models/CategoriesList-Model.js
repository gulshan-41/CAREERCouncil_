import mongoose from "mongoose";

const CategoriesListSchema = new mongoose.Schema({
    categoriesList : {
        type: Object,
        required: true
    } 
});

const CategoriesListModel = mongoose.models.CategoriesList || mongoose.model('CategoriesList', CategoriesListSchema);

export default CategoriesListModel;