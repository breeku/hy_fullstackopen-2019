const mongoose = require("mongoose")

let blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
    likes: {type: Number, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

blogSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model("Blog", blogSchema)
