const express = require("express");
const router = express.Router();
const {
  postData,
  getData,
  editData,
} = require("../controllers/wardController");
const auth = require("../middlewares/auth");
router.post("/addWard", auth, postData);
router.patch("/editWard/:id", auth, editData);
router.get("/", auth, getData);

module.exports = router;
