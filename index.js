const expresss = require("express");
const app=expresss();
const mongoose = require("mongoose");
const morgan = require("morgan")
const helmet = require("helmet");
const Studentrouter =require("./routes/student")
const dean =require("./routes/dean")
const cookieParser = require("cookie-parser");
const database = (module.exports = () => {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    try {
      mongoose.connect(
        'mongodb+srv://nikhilanand2432:aJLLzYXW9V0ixpMA@cluster0.kgvidvu.mongodb.net/?retryWrites=true&w=majority',
        connectionParams
      );
      console.log("Database connected succesfully");
    } catch (error) {
      console.log(error);
      console.log("Database connection failed");
    }
  });
  database();
  app.use(expresss.json());
  app.use(cookieParser());
  app.use(helmet());
app.use(morgan("common"));
  app.use('/api', Studentrouter);
  app.use('/api/dean', dean);
  app.listen(8800,()=>{
    console.log("ready");
})