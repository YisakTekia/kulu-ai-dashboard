import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '30d' });
};

// Register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, role, languages } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || 'USER', 
      status: 'ACTIVE',
      languages: languages || []
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user.id as string),
      });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    
    if (user && (await bcrypt.compare(password, user.password))) {
      
      //  [cite: 52-55]
      if (user.softDeleted || user.status !== 'ACTIVE') {
         res.status(403).json({ message: 'Your account is suspended or inactive.' });
         return;
      }

      res.json({
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user.id as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};