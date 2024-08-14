
const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
          
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(`Error ${err.message}`);//SrtEMI6TRwuj2kuW
    }
};

module.exports = dbConnect;
