import mongoose from "mongoose";

export const dbConnect = async () => {
    await mongoose.connect(process.env.MONGODATABASE_URL).then(() => {
        console.log("MongoDB Connected!");
    }).catch((error) => {
        console.log(error);
        process.exit(0);
    })
}
