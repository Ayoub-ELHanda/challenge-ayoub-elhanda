import { verify, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type as needed
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not defined' });
    }

    try {
      const decoded = verify(token, jwtSecret) as JwtPayload; // Directly using verify without callback
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
};

export default protect;
