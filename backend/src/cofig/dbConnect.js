const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://gulshanDB:Iaot9lXTGrM605ox@mark99.w6lwsmb.mongodb.net/?retryWrites=true&w=majority&appName=Mark99").then(() => {
            console.log("MONGODB CONNECTED!");
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {dbConnect};