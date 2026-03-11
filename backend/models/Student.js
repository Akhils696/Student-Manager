const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  gradeLevel: { type: String },
  subjects: [{ type: String }],
  enrollmentDate: { type: Date },
  profilePicture: { type: String },
  address: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
