

//error middleware for passing all the error to entire application
export const errorMiddleware = (err, req, res, next) => {

    const status = err.status || 500;
    const msg = err.msg || "Backend Error";

    console.log(status,msg);
    

    res.status(status).json({ success: false, msg: msg });
}