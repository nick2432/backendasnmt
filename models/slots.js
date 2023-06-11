const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
 
  slots: [
    {
        period:{
            type: String,
            required: true,
        },
        time:{
            type: String,
            required: true,
        },
        date:{
            type: String,
            required: true,
        },
        booked:{
          type: Boolean,
          required:true,
        },
        bookedby:{
          type: String,
          required:true,
          select: false,
        }
    }
  ],
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
});
module.exports = mongoose.model("slots", slotSchema);
