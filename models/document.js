const mongoose = require('mongoose');
// Schema of the collection documents which consists of key, createdAt and counts
const documentSchema = mongoose.Schema({
    key: String,
    createdAt: Date,
    counts: Array,
},{collection: 'records'});
module.exports = mongoose.model('document',documentSchema)