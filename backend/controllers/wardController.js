const { default: mongoose } = require("mongoose");
const Ward = require("../models/wardModel");

const postData = async (req, res) => {
  const { patientNumber, wardName, wardNumber, workerNumber } = req.body;
  console.log(req.body);
  try {
    let existingWard = await Ward.findOne({ wardName });
    if (existingWard) {
      console.log("Ward already exists");
      return res.status(404).json({ message: "Ward already exists" });
    }

    const newWard = await Ward.create({
      patientNumber,
      wardName,
      wardNumber,
      workerNumber,
    });

    console.log(newWard);
    res.status(200).json({ message: "Ward created" });
  } catch (e) {
    console.log(e);
  }
};

const getData = async (req, res) => {
  try {
    const wardData = await Ward.find();
    res.status(200).json(wardData);
  } catch (error) {
    console.log(error);
  }
};

const editData = async (req, res) => {
  const { wardName, wardNumber, patientNumber, workerNumber } = req.body;
  const { id } = req.params;
  console.log(id);
  console.log(wardName, wardNumber, patientNumber, workerNumber);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No ward with that id");
    }
    const updatedWard = await Ward.findByIdAndUpdate(
      id,
      {
        wardName,
        wardNumber,
        patientNumber,
        workerNumber,
      },
      { new: true }
    );
    console.log(updatedWard);
    res.json(updatedWard);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postData, getData, editData };
