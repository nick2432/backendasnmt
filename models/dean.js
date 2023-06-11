const mongoose = require("mongoose");

const deanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  IDnumber: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  token: {
    type: String,
  },
  slots:[
    {
        type: mongoose.Schema.Types.ObjectId,
    }
  ]
  
});
module.exports = mongoose.model("dean", deanSchema);
