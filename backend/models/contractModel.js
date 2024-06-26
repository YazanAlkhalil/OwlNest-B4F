const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
    companyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Company"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    role : {
        type : String,
        required : true,
        enum : ["trainer" , "trainee"]
    },
    joinDate : {
        type : Date 
    }
})

const Contract = mongoose.model('Contract',contractSchema);

module.exports = Contract;
