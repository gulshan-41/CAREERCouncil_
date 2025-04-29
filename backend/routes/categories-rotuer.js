import express from 'express';
import { addCategoriesList, getCategoriesList } from '../controllers/categories-controllers.js';

const CategoriesRouter = express.Router();


//route for adding categories list
CategoriesRouter.post('/addcategorieslist', addCategoriesList);

//route for geting categories list
CategoriesRouter.get('/getcategorieslist', getCategoriesList);

export default CategoriesRouter;