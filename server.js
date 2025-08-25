const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const app = require('./app');

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
