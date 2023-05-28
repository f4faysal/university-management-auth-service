import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function bootstap() {
  try {
    await mongoose.connect(config.database__url as string);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    console.log(` Database is Connact Success`);
    app.listen(config.port, () => {
      console.log(`Appliction listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstap();
