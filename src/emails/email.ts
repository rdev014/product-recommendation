import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Define transporter options interface
interface TransporterOptions {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
}

// Create the transporter with typed options
export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST as string,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USERNAME as string,
        pass: process.env.MAIL_PASSWORD as string
    },
} as TransporterOptions);

// Verify the transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("Error in email transporter", error);
    } else {
        console.log("Email transporter is ready to take messages");
    }
});

// Import email templates
import { verificationTokenEmailTemplate, WELCOME_EMAIL_TEMPLATE } from './email-Templates.js';

// Define email sending functions
export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: "Verify email",
            html: verificationTokenEmailTemplate.replace("{verificationToken}", verificationToken),
        });
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error("Error sending verification email");
    }
};

export const sendWelcomeEmail = async (email: string, username: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: "Welcome email",
            html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username),
        });
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error("Error sending welcome email");
    }
};

export const sendResetPassword = async (email: string, resetEmailUrl: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: "Reset password email",
            html: `Click <a href="${resetEmailUrl}" >here</a> to reset your password`,
        });
        console.log('Reset password email sent successfully');
    } catch (error) {
        console.error("Error sending reset password email", error);
        throw new Error("Error sending reset password email");
    }
};

export const sendResetSuccess = async (email: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: "Reset password success",
            html: `Your password changed successfully`,
        });
        console.log('Reset success email sent successfully');
    } catch (error) {
        console.error("Error sending reset success email", error);
        throw new Error("Error sending reset success email");
    }
};
