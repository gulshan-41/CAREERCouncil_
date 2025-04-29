import mongoose from "mongoose";

const CategoriesListSchema = new mongoose.Schema({

    categoriesList : {
        type: Object,
        required: true
    } 

});

const CategoriesListModel = mongoose.model.CategoriesList || mongoose.models('CategoriesList', CategoriesListSchema);

export default CategoriesListModel;