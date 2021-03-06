const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//import routes
const seatsRoute = require('./routes/seats.routes');
const testimonialsRoute = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonialsRoute);
app.use('/api', seatsRoute);
app.use('/api', concertsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});



app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});