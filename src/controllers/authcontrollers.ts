import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateVefificationToken } from '../utils/generateVerificationToken';
import { generateJWTToken } from '../utils/generateJWTToken';
import { sendResetPassword, sendResetSuccess, sendVerificationEmail, sendWelcomeEmail } from '../emails/email';
import crypto from 'crypto';

interface ExistUser {
    email: string;
    username: string;
}

interface UserExistence {
    userByEmail: ExistUser | null;
    userByUsername: ExistUser | null;
}

const checkUserExistance = async (email: string, username: string): Promise<UserExistence> => {
    const [userByEmail, userByUsername] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ username }),
    ]);

    return { userByEmail, userByUsername };
};

