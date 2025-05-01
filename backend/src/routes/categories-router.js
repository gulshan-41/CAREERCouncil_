import express from 'express';
import { addCategoriesList, getCategoriesList } from '../controllers/categoriesList-controllers.js';
import { addCategoriesData, getCategoriesData } from '../controllers/categoriesdata-controllers.js';

const CategoriesRouter = express.Router();

//route for adding categories list
CategoriesRouter.post('/addcategorieslist', addCategoriesList);

//route for geting categories list
CategoriesRouter.get('/getcategorieslist', getCategoriesList);

//route for adding categories Data
CategoriesRouter.post('/addcategoriesdata', addCategoriesData);

//route for geting categories Data
CategoriesRouter.get('/getcategoriesdata/:catID', getCategoriesData);


export default CategoriesRouter;