const uuid = require("uuid");
const Student = require("../models/student.js");
const Slots = require("../models/slots.js");
exports.login = async (req, res) => {
  try {
    const { IDnumber, password } = req.body;
    const student = await Student.findOne({ IDnumber }).select("+password");

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    // Generate a UUID as the bearer token
    const token = uuid.v4();
    // Update the student's token field in the database
    student.token = token;
    await student.save();

    res.status(200).json({
      success: true,
      student,
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
      const student = await Student.findOne({ token });
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication credentials",
      });
    }
      const slots = await Slots.findById(req.params.id);
  
      if (!slots) {
        return res.status(404).json({
          success: false,
          message: "Slots not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        slots,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.bookSlot = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
          success: false,
          message: "Invalid authentication credentials",
        });
      }
      const token = authHeader.split(" ")[1];
      const student = await Student.findOne({token});
  
      if (!student) {
        return res.status(401).json({
          success: false,
          message: "Invalid authentication credentials",
        });
      }
      const {period,time,date} = req.body;
      const slot = await Slots.findById(req.params.id);
  
      if (!slot) {
        return res.status(404).json({
          success: false,
          message: "Slot not found",
        });
      }
      let slotexistidx=-1;
      for(let i=0;i<slot.slots.length;i++){
          if(slot.slots[i].time===time && slot.slots[i].period===period && slot.slots[i].date===date){
            slotexistidx=i;
          }
      }
      if(slotexistidx===-1){
        return res.status(409).json({
          success: false,
          message: "Slot does not exist",
        });
      }
      if (slot.slots[slotexistidx].booked) {
        return res.status(409).json({
          success: false,
          message: "Slot is already booked",
        });
      }
      slot.slots[slotexistidx].booked = true;
     
      slot.slots[slotexistidx].bookedby = student._id;
      await slot.save();
      return res.status(200).json({
        success: true,
        message: "Slot booked successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  