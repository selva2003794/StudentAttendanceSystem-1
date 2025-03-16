const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendanceSchema');


// Route to get all attendance records
router.get('/', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.json(attendanceRecords);
        //console.log(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get the count of attendance records
router.get('/count', async (req, res) => {
    try {
        const count = await Attendance.countDocuments();
        res.json({ count });
        //console.log(count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new attendance record
router.post('/', async (req, res) => {
    const attendance = new Attendance({
        name: req.body.name,
        rollno: req.body.rollno,
        attendance: req.body.attendance,
        history: req.body.history
    });

    try {
        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update attendance
router.put('/:rollno', async (req, res) => {
    try {
        const attendance = await Attendance.findOne({ rollno: req.params.rollno });
        if (!attendance) {
            return res.status(404).json({ message: 'Student not found' });
        }
        attendance.attendance = req.body.attendance;
        attendance.history.push(req.body.historyEntry);
        const updatedAttendance = await attendance.save();
        res.json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a student
router.delete('/:rollno', async (req, res) => {
    try {
        const attendance = await Attendance.findOneAndDelete({ rollno: req.params.rollno });
        if (!attendance) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;