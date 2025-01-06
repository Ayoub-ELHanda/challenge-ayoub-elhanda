import { Request, Response } from 'express';
import { User } from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};
