const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const attendanceRoutes = require('./routes/attendanceRoutes'); // Ensure this path is correct

const app = express();
const PORT = 5500;
const MONGO_URL = `mongodb+srv://selva91823:Attendance@cluster0.sxbcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//const MONGO_URL = `mongodb+srv://selva91823:l6fNWkCXodkXf0Jp@cluster0.sxbcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(MONGO_URL, {

})

    .then(() => {
        
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use('/api/students', attendanceRoutes); // Ensure this path is correct
setTimeout(() => {
    app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));

}, 3000)

