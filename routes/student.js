const  router  = require("express").Router();
const {login,slots,bookSlot}=require("../controllers/student.js")
router.route("/login").post(login); 
router.route("/slots/:id").get(slots);
router.route('/slots/book/:id').post(bookSlot);
module.exports = router;