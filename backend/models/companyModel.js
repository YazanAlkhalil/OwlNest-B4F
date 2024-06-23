const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    companyEmail : {
        type : String,
        required : true
    },
    companyPhone : {
        type : Number,
        required : true
    },
    logo : {
        type : String
    },
    country : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    size : {
        type : Number
    },
    description : {
        type : String
    }
},{
    timestamps : true
})

const Company = mongoose.model('Company',companySchema);

module.exports = Company;