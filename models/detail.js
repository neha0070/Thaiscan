const {Schema , model} = require('mongoose');

const idData = new Schema({
    ipImage: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['SUCCESS', 'UNSUCCESSFUL']
    },
    identification_number: { type: String },
    name: { type: String },
    last_name: { type: String },
    date_of_birth: { type: String },
    date_of_issue: { type: String },
    date_of_expiry: { type: String}
},
    {timestamps: true}
);

const Details = model('details', idData);
module.exports = {Details};