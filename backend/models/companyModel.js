const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    ownerId : {
        type : mongoose.Schema.Types.ObjectId
    },
    ownerName : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true,
        unique : true
    },
    logo : {
        type : String
    },
    country : {
        type : String,
        required : true
    },
    cityOfHQ : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    sizeOfEmployment : {
        type : String,
        required : true,
        enum : ["1-10 employees","11-50 employees","more than 50 employees"]
    },
    description : {
        type : String,
        required : true
    },
    admins : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }],

},{
    timestamps : true
})

const Company = mongoose.model('Company',companySchema);

module.exports = Company;
