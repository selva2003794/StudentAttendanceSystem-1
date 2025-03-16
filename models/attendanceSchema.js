const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true,
        unique: true
    },
    attendance: {
        type: String,
        required: true
    },
    history: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('students', attendanceSchema);