import Organization from "../models/Organization.js"

export const createOrganization =  async (req,res) => {
    try {
        const organization = new Organization(req.body);
        await organization.save();
        res.status(201).json(organization);
    } catch (err) {
        res.status(500).json({error: err.message})

    }
}


export const getAllOrganizations = async (req,res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


export const getOrganizationById = async (req,res) => {
    const {id} = req.params
    console.log(id,"imid")
    try {
        const organization = await Organization.findById(id, req.body, {new:true})
        if(!organization) return res.status(404).json({message:'Organization not found'})
        res.json(organization)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

export const updateOrganizationById = async (req,res) => {
    const {id} = req.params
    console.log(id,"imid")


    try {
        const organization = await Organization.findByIdAndUpdate(id, req.body, {new:true})
        if(!organization) {
            return res.status(404).json({message:'Organization not found'})
        }
        res.json(organization);

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

export const deleteOrganizationById = async (req,res) => {
    const {id} = req.params
    try {
        const organization = await Organization.findByIdAndDelete(id)
        if(!organization) {
            return res.status(404).json({ message:'Organization not found'})

        }
        res.json({message:'Organization Deleted'})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}