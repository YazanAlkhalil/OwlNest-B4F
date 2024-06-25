const Users = require('../models/usersModel')
const Company = require('../models/companyModel')
const Contract = require('../models/contractModel')

const addUserToCompnay = async (req,res) => {
    try {
        const { email , role } = req.body
        const { companyId , userId } = req.params

        const company = await Company.findById(companyId)
        const user = await Users.findById(userId)
        
        if(!company){
            return res.status(404).json({msg : 'Company not found'})
        }

        if(!user){
            return res.status(404).json({msg : 'User not found'})
        }

        if (user.email !== email) {
            return res.status(400).json({ message: 'Email does not match user' });
        }

        if (company.admins.includes(userId)) {
            return res.status(400).json({ message: 'User is already an admin of this company'});
        }

        if(role == "admin"){
            company.admins.push(userId);
            await company.save()
            res.status(200).json({ message : "Add to company successfully"})
        }else {
            const newContract = new Contract({
                companyId,
                userId,
                role,
                joinDate : new Date()
            })
            await newContract.save();
            res.status(200).json({ message : "Add to contract successfully"})
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUsersFromCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const contracts = await Contract.find({ companyId }).populate('userId');
        const company = await Company.findById(companyId).populate('admins', 'username');

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const adminUsernames = company.admins.map(admin => ({
            name : admin.username,
            role : "admin"
        }));
        const users = contracts.map(contract => ({
            name: contract.userId.username,
            role: contract.role,
            lastLogin: contract.userId.updatedAt
        }));

        res.status(200).json([...users, ...adminUsernames]);
        
    }  catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addUserToCompnay,
    getUsersFromCompany
}