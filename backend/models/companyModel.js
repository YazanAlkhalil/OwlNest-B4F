const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyId : {
        type : mongoose.Schema.Types.ObjectId
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId
    },
    ownerName : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    email : {
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
        required : true
    },
    description : {
        type : String,
        required : true
    },
    admins : {
        type : Array,
        ref : "Users"
    },

},{
    timestamps : true
})

const Company = mongoose.model('Company',companySchema);

module.exports = Company;