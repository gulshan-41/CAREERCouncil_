import CategoriesDataModel from "../models/CategoriesData-Model.js"




//adding CategoriesData in database
export const addCategoriesData = async (req, res, next) => {

    try {

        const addCategoriesData = await CategoriesDataModel.create(req.body);

        console.log(addCategoriesData);

        res.status(201).json({ success: true, addCategoriesData });


    } catch (err) {

        const error = {
            status: 417,
            msg: "Categories Data Not Added",
        }

        next(error);
    }

}

//getting CategoriesData in database
export const getCategoriesData = async (req, res, next) => {

    try {

        const getCategoriesData = await CategoriesDataModel.findOne({ catID: req.params.catID });

        res.status(200).json({ success: true, getCategoriesData: getCategoriesData });

    } catch (err) {

        const error = {
            status: 417,
            msg: "Categories Data Not Found",
        }

        next(error);
    }

}