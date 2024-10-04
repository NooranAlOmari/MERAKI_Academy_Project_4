const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// connecting to mongodb
mongoose.connect(process.env.Project_Four).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);
