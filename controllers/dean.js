const uuid = require("uuid");
const Dean = require("../models/dean.js");
const Slots = require("../models/slots.js");
exports.login = async (req, res) => {
    try {
      const { IDnumber, password } = req.body;
      const dean = await Dean.findOne({ IDnumber }).select("+password");
      if (!dean) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      } 
      const token = uuid.v4();
      dean.token = token;
      await dean.save();
      res.status(200).json({
        success: true,
        dean,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.slots = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
          success: false,
          message: "Invalid authentication credentials",
        });
      }
      const token = authHeader.split(" ")[1];
      const dean = await Dean.findOne({ token });
    if (!dean) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication credentials",
      });
    }
      if (!dean.slots) {
        return res.status(404).json({
          success: false,
          message: "Slots not found",
        });
      }
      const slt = dean.slots;
      const slot = await Slots.findOne({ _id:{$in:slt}});
      const arr=[{}];
      for(let i=0;i<slot.slots.length;i++){
        if(slot.slots[i].booked===true){
            arr.push(slot.slots[i]);
        }
      }
      return res.status(200).json({
        success: true,
        arr
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };