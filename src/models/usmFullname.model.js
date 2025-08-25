const mongoose = require('mongoose');

const FullnameSchema = mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    fullname: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('usm_fullnames', FullnameSchema);
