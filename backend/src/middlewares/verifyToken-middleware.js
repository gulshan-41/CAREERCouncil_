import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {

    const token = req.cookies.token;

    try {

        if (token) {

            const verify = jwt.verify(token, process.env.JWT_SECERET);
            if (verify) {
                req.body = verify;
                next();
            }
            else if(!verify){
                return res.status(401).json({ success: false, msg: "Not Authenticate!" });
            }
        }
        else{
            
            return res.status(401).json({ success: false, msg: "Not Authenticate!" });
        }

    } catch (err) {

        const error = {
            status :401,
            msg: "Unauthorized Person"
        }

        next(error);

    }
};