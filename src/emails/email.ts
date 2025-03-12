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
