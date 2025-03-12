import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateJWTToken = (res: Response, userId: string): { accessToken: string; refreshToken: string } => {
    // Generate an Access token with the user ID
    const accessToken: string = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: '1d', // short expiration time for testing purposes
    });

    // Generate a Refresh token valid for 7 days
    const refreshToken: string = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: '7d', // long expiration time
    });

    // Store Access token in an HttpOnly cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Store Refresh token in an HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return the Access token and Refresh token
    return { accessToken, refreshToken };
};
