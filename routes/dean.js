const  router  = require("express").Router();
const {login,slots}=require("../controllers/dean.js")
router.route("/login").post(login); 
router.route("/slots").get(slots);
module.exports = router;
