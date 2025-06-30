import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).send({ user, token });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1000 });

    return res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        maxAge: 60 * 60 * 1000
    }).send({user});
};

export const logoutUser = async (req,res) => {
    console.log('Cookies received on logout:', req.cookies); // Debug log
    const {token} = req.cookies;

    if(!token) return res.status(401).send({message : 'Invalid user'});

    return res
    .clearCookie('token')
    .send({message : 'User logged out successfully'});
}

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};