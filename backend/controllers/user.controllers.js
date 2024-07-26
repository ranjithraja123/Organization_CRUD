import User from "../models/User.js";

export const createUser = async (req,res) => {
    try{
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}

export const getAllUsers = async (req,res) => {
    console.log("ususu1")
    try {
        const user = await User.find().populate('organization');
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}

export const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).populate('organization')
        if(!user) return res.status(404).json({message: 'User not found'})
        res.json(user)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

export const updateUserById = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!user) return res.status(404).json({message:'User not found'})
        res.json(user)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}


export const deleteUserById = async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({message:'User not found'})
        }
        res.json({message:'User deleted successfully'})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}



export const getAllUsersOfOrganization = async (req, res) => {
    try {
        // Assuming req.user contains the authenticated user data
        const organizationId = req.user.organization; // or another way to fetch organization id
        
        const users = await User.find({ organization: organizationId }).populate('organization');

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found in this organization' });
        }

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: `Failed to retrieve users: ${err.message}` });
    }
};

