
//middleware to check zod schema for validation of user data
export const validate = (schema) => async (req, res, next) => {

    try {

        //checking req.body to zod schema
        //ZOD to check user data with help of parseAsync
        

        const parseBody = await schema.parseAsync(req.body);
        
        req.body = parseBody;

        next();

    } catch (err) {
        
        const error = {
            status: 422,
            msg: err.errors[0].message
        }
        next(error);
    }
};