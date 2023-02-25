import mongoose from "mongoose";

const mongodb = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("Connected"))
    .catch((error) => console.log(error));
};
export default mongodb;
