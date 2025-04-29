import CategoriesListModel from "../models/CategoriesList-Model.js";
import NodeCache from 'node-cache';

//making api 10x fast cheat-code
const nodeCache = new NodeCache();

//adding categories list from postman later we will make admin panel for career council 
export const addCategoriesList = async (req, res, next) => {
    try {
        const createCategoriesList = await CategoriesListModel.create(req.body);
        nodeCache.del('categoriesList');

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
        let categoriesList;

        if (nodeCache.has('categoriesList')) {
            categoriesList = JSON.parse(nodeCache.get('categoriesList'));
        }
        else {
            categoriesList = await CategoriesListModel.find({});
            nodeCache.set('categoriesList', JSON.stringify(categoriesList));
        }

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