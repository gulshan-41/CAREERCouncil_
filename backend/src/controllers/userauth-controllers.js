import UserModel from "../models/User-Model.js";

//register api endpoint
export const register = async (req, res, next) => {

    try {


        const { name, email, age, password, occupation, strengths, interests } = req.body;
        

        //Checking User Exist
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) {
            return res.status(404).json({ success: false, msg: "User already exists!" });
        }

        //Creating User
        const userCreated = await UserModel.create({
            name: name,
            email: email,
            age: age,
            password: password,
            occupation: occupation,
            strengths: strengths,
            interests: interests
        });

        //generating token and setting age for expire    
        const token = await userCreated.generateToken();
        
        //setting age for cookies to be expire
        const cookieAge = 1000 * 60 * 60 * 24 * 5;

        //setting cookie because more security rather then saving in localstorage

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            samSite: 'strict',
            maxAge: cookieAge,
            path: '/',
        }).status(202).json({
            success: true,
            msg: "User Created Successfully",
        });

    } catch (err) {
        const error = {
            status: 404,
            message: "User Not Created"
        }

        next(error);
    }
}

//login api endpoint
export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        //checking if user exist in database

        const userExist = await UserModel.findOne({ email: email });

        if (!userExist) return res.status(404).json({ success: false, msg: "Invalid Credentials!" });

        //Comaparing User Password

        const validPassword = await userExist.comparePassword(password);

        if (!validPassword) return res.status(401).json({ success: false, msg: "Invalid Credentials!" })

        //generating token and setting age for expire    
        const token = await userExist.generateToken();

        //setting age for cookies to be expire
        const age = 1000 * 60 * 60 * 24 * 5;

        //setting cookie becuse more security rather then saving in localstorage

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            samSite: 'strict',
            maxAge: age,
            path: '/',
        }).status(202).json({
            success: true,
            msg: "Logged In",
        });


    } catch (error) {

        next(error);
    }

}

//logout api endpoint
export const logout = async (req, res, next) => {

    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            samSite: 'strict',
            path: '/',
        }).status(202).json({ success: true, msg: "Logout SuccessFully!" });

    } catch (err) {

        const error = {
            status: 401,
            message: "Not Authorized"
        }
        next(error)

    }
}

//getuser api endpoint
export const getuser = async (req, res, next) => {
    try {

        const { userID } = req.body;

        const response = await UserModel.findById({ _id: userID },{password: 0, _id: 0});

        res.status(200).json({ success: true, data: response });
    } catch (err) {

        const error = {
            status: 401,
            message: 'UnAuthorized User'
        };

        next(error);

    }
}