const Company = require('../models/companyModel')

const createCompany = async (req,res) => {
    try{
        const {
            companyName,
            companyEmail,
            companyPhone,
            logo,
            country,
            location,
            size,
            description
        } = req.body;

        const companyNameExist = await Company.findOne({companyName})
        const companyEmailExist = await Company.findOne({companyEmail})

        if(companyNameExist || companyEmailExist){
            return res.status(400).json({message: 'Company already exists'})
        }

        const newCompany = new Company({
            companyName,
            companyEmail,
            companyPhone,
            logo,
            country,
            location,
            size,
            description
        })

        if(newCompany){
            await newCompany.save()
            res.status(201).json(newCompany)
        }else{
            res.status(400).json({message: 'Invalid company'})
        }
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
}