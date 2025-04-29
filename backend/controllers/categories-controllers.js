
//adding categories list from postman later we will make admin panel for career council 
export const addCategoriesList = async (req, res) => {
    
    res.status(200).json(req.body)
};

//getting categories list from database
export const getCategoriesList = async (req, res) => {
    
    res.status(200).json("Yo its working")

};