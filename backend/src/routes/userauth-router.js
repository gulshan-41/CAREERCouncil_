import express from 'express';
import { getuser, login, logout, register } from '../controllers/userauth-controllers.js';
import { validate } from '../middlewares/validator-middleware.js';
import { loginSchema, signupSchema } from '../validator/auth-validator.js';
import { verifyToken } from '../middlewares/verifyToken-middleware.js';

const UserRouter = express.Router();

//register route
UserRouter.post('/register', validate(signupSchema), register);

//login route
UserRouter.post('/login', validate(loginSchema), login);

//logout route
UserRouter.post('/logout', verifyToken, logout);

//get user route 
UserRouter.get('/getuser', verifyToken, getuser);

export default UserRouter;