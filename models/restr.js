const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestrSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true

        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    description: String,
    location: String,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
});

module.exports = mongoose.model('Restr', RestrSchema);