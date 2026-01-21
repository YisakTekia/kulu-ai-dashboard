import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user';

export interface AuthRequest extends Request {
  user?: IUser;
}


const ROLE_LEVELS: { [key: string]: number } = {
  USER: 1,
  SUPERVISOR: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      
      const user = await User.findById(decoded.id).select('-password');

      
      if (!user || user.softDeleted || user.status !== 'ACTIVE') {
         res.status(403).json({ message: 'Account is inactive, suspended, or deleted.' });
         return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


export const authorize = (minRole: 'USER' | 'SUPERVISOR' | 'ADMIN' | 'SUPER_ADMIN') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role || 'USER';
    
    if (ROLE_LEVELS[userRole] < ROLE_LEVELS[minRole]) {
       res.status(403).json({ message: `Access denied. Requires ${minRole} role.` });
       return;
    }
    next();
  };
};