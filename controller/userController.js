import User from '../model/userModel.js';

export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({errorMessage: 'User already exists'});
        }

        const savedUser = await newUser.save();
        res.status(201).json({message: 'User created successfully', user: savedUser});
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};