const mongoose = require("mongoose");

module.exports.init = async function () {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Server is connected to database");
};