const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    className: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    grade: { type: Number, required: true },
    attendance: { type: Number, required: true },
    violations: { type: Number, required: true },
  },
  { timestamps: true }
);

// Unique combination of email + class
studentSchema.index({ email: 1, className: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
