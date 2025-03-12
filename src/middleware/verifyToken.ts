import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the expected structure of a decoded token
type DecodedToken = {
  userId: string;
};

// Middleware function to verify JWT tokens
export const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  // Retrieve access and refresh tokens from cookies
  const accessToken: string | undefined = req.cookies?.accessToken;
  const refreshToken: string | undefined = req.cookies?.refreshToken;

  // If access token is missing, attempt to use refresh token
  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "Unauthorized: No tokens provided" });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') {
        return res.status(403).json({ success: false, message: "Invalid refresh token" });
      }

      // Extract userId from decoded refresh token
      const { userId } = decoded as DecodedToken;
      
      // Generate a new access token
      const newAccessToken = jwt.sign(
        { userId },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: '1h' } // Set expiration to 1 hour
      );

      // Set the new access token as an HTTP-only cookie
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure flag for production
        sameSite: 'strict',
        maxAge: 1 * 60 * 60 * 1000, // 1-hour expiration
      });

      // Attach userId to the request object for further use
      (req as any).userId = userId;
      return next();
    });
  } else {
    // If access token exists, verify it
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string, (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') {
        return res.status(403).json({ success: false, message: "Invalid access token" });
      }

      // Extract userId from the decoded access token
      const { userId } = decoded as DecodedToken;
      
      // Attach userId to the request object for further use
      (req as any).userId = userId;
      next();
    });
  }
};
