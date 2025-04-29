import CategoriesListModel from "../models/CategoriesList-Model.js";


//adding categories list from postman later we will make admin panel for career council 
export const addCategoriesList = async (req, res, next) => {
    try {

        const createCategoriesList = await CategoriesListModel.create(req.body);

        res.status(201).json({ success: true, categoriesList: createCategoriesList });


    } catch (err) {

        const error = {
            status: 417,
            msg: "Categories List Not Added",
        };

        next(error);

    }
};

//getting categories list from database
export const getCategoriesList = async (req, res, next) => {

    try {

        const categoriesList = await CategoriesListModel.find({});

        const data = categoriesList[0].categoriesList
        

        res.status(201).json({ success: true, categoriesList: data });

    } catch (err) {

        const error = {
            status: 404,
            msg: "Categories List Not Found"
        }

        next(error)
    }

};