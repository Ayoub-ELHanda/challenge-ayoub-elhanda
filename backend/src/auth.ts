import bcryptjs from "bcryptjs";  // Import bcryptjsjs instead of bcryptjs

const saltRounds = 10;

/**
 * Hash a password securely using bcryptjs.
 * @param password - The plain text password to be hashed.
 * @returns A promise resolving to the hashed password string.
 */
export const hashPass = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed.");
    }
};

/**
 * Compare a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The previously hashed password to compare against.
 * @returns A promise resolving to true if the passwords match, otherwise false.
 */
export const authUser = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        return await bcryptjs.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        throw new Error("Password verification failed.");
    }
};
