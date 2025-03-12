import crypto from 'crypto';

function generateSecretKey(lenght:number = 64):string{
    return crypto.randomBytes(lenght).toString('hex');
}

// Generate JWT secret key
const accessSecretKey:string = generateSecretKey(32); // 32 bytes = 256 bits
const refreshSecretKey:string = generateSecretKey(64); // 64 bytes = 512 bits

console.log(`JWT_ACCESS_SECRET:, ${accessSecretKey}`);
console.log(`JWT_REFRESH_SECRET:, ${refreshSecretKey}`);
