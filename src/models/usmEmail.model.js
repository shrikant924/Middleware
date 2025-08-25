const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    email: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('usm_emails', EmailSchema);
