const Users = require('../models/usersModel')
const Company = require('../models/companyModel')
const Contract = require('../models/contractModel')
const addUserToCompnay = async (req,res) => {
    try {
        const { email , role } = req.body
        const { companyId  } = req.params
        const loggedInUserId = req.user._id

        const company = await Company.findById(companyId)
        const user = await Users.findOne({email})
        if(!company){
            return res.status(404).json({msg : 'Company not found'})
        }
        
        if(!user){
            return res.status(404).json({msg : 'User not found'})
        }
        if(company.ownerId.toString() !== loggedInUserId.toString() && !company.admins.find(admin => admin.toString() === loggedInUserId.toString())){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const contract = await Contract.findOne({companyId,userId:user._id})
        if(contract){
            return res.status(400).json({ message: 'User is already in this company'});
        }
        
        if (company.admins.includes(user._id)) {
            return res.status(400).json({ message: 'User is already an admin of this company'});
        }

        if(role == "admin"){
            company.admins.push(user._id);
            await company.save()
            return res.status(200).json({ message : "Add to company successfully"})
        }
        const newContract = new Contract({
            companyId,
            userId:user._id,
            role,
            joinDate : new Date()
        })
        await newContract.save();
        res.status(200).json({ message : "Add to contract successfully"})
        

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUsersFromCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const loggedInUserId = req.user._id
        const contracts = await Contract.find({ companyId }).populate('userId');
        const company = await Company.findById(companyId).populate('admins', 'username');

        
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        
        if(company.ownerId.toString() !== loggedInUserId.toString() && !company.admins.find(admin => admin._id.toString() === loggedInUserId.toString())){
            return res.status(401).json({message: 'Unauthorized'})
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

const updateUserRole = async (req, res) => {
    try {
        const { companyId, userId } = req.params;
        const { role } = req.body;
        const loggedInUser = req.user._id
        let loggedInUserRole;

        
        const company = await Company.findById(companyId);
        const user = await Users.findById(userId);
        if (!company) {
            return res.status(404).json({ msg: 'Company not found' });
        }
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const admin = company.admins.find(adminId => adminId.toString() === loggedInUser.toString())

        if(company.ownerId.toString() == loggedInUser.toString()) {
            loggedInUserRole = "owner"
        }
        else if(admin && role !== "admin"){
            loggedInUserRole = "admin"
        }else {
            return res.status(401).json({ msg : "UnAuthorized" })
        }

        if (role === 'admin') {
            if (!company.admins.includes(userId)) {
                company.admins.push(userId);
                await company.save();
            }            
            await Contract.deleteOne({ companyId, userId });

            return res.status(200).json({ message: 'User role updated to admin successfully' });
            
        } else if (role === 'trainer' || role === 'trainee') {
            company.admins = company.admins.filter(adminId => adminId.toString() !== userId);
            await company.save();

            let contract = await Contract.findOne({ companyId, userId });
            if (contract) {
                contract.role = role;
                await contract.save();
            } else {
                contract = new Contract({
                    companyId,
                    userId,
                    role,
                    joinDate: new Date()
                });
                await contract.save();
            }
            return res.status(200).json({ message: `User role updated to ${role} successfully` });
        } else {
            return res.status(400).json({ message: 'Invalid role specified' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeUserFromCompany = async (req, res) => {
    try {
        const { companyId, userId } = req.params;
        const loggedInUser = req.user._id
        let loggedInUserRole = ""

        const company = await Company.findById(companyId);
        const user = await Users.findById(userId);

        if (!company) {
            return res.status(404).json({ msg: 'Company not found' });
        }

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const admin = company.admins.find(adminId => adminId.toString() === loggedInUser.toString())

        if(company.ownerId.toString() === loggedInUser.toString()){
            loggedInUserRole = "owner"
        }
        else if(admin ){
            loggedInUserRole = "admin"
        }else {
            return res.status(401).json({ msg : "UnAuthorized" })
        }
        const removedAdmin = company.admins.find(admin => admin.toString() === user._id.toString())
        if(company.ownerId.toString() === user._id.toString()){
            return res.status(400).json({ msg:"Can't delete owner"})
        }
        else if(loggedInUserRole === 'admin' && removedAdmin)
        {
            return res.status(401).json({ msg : "UnAuthorized" })

        }
        else if(!removedAdmin){
            await Contract.deleteOne({ companyId, userId });
        }
        else{
            company.admins = company.admins.filter(admin => admin.toString() === user._id.toString())
            await company.save()
        }
        res.status(200).json({ message: 'User removed from company successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRole = async (req, res) => {
    try {
        const { companyId } = req.params
        const loggedInUser = req.user._id
        const company = await Company.findById(companyId).select("admins")
        const roles = []
        const contracts = await Contract.findOne({companyId , userId:loggedInUser})

        if(company.admins.includes(loggedInUser)){
            roles.push("admin")
        }
        if(contracts && contracts.role === "trainer"){
            roles.push("trainer")
        }

        res.status(200).json(roles)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCompanies = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const logos = new Set()
        let company = await Company.find()
        let contracts = await Contract.find({userId : loggedInUserId}).populate('companyId')
        if(company){
            company = company.filter(company => company.admins.find(id => id.toString() === loggedInUserId.toString()) || company.ownerId.toString() === loggedInUserId.toString()).map(company => company.logo)
            if(company.length > 0)
            logos.add(...company)
        }
        if(contracts){
            contracts = contracts.map(contract => contract.companyId.logo)
            if(contracts.length > 0){
            logos.add(...contracts)
        }}
        res.status(200).json([...logos])
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    addUserToCompnay,
    getUsersFromCompany,
    updateUserRole,
    removeUserFromCompany,
    getRole,
    getCompanies
}
