const mongoose = require('mongoose');

const PasswordSchema = mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('usm_passwords', PasswordSchema);
