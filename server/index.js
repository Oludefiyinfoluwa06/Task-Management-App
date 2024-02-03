const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const profilePicUploadRoute = require('./routes/profilePicUploadRoute');
const app = express();
const port = 5000;

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/profile', profilePicUploadRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));