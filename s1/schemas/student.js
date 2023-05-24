const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: String,
  rollNo: Number,
  wad: Number,
  dsbda: Number,
  cns: Number,
  cc: Number,
  ai: Number,
});

module.exports = { studentSchema };
