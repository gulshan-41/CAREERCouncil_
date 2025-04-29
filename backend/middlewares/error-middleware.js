

//error middleware for passing all the error to entire application
export const errorMiddleware = (err, req, res, next) => {
    
    const status = err.status || 500;
    const message = err.msg || "Backend Error";

    return res.status(status).json({ success: false, msg: message });

}