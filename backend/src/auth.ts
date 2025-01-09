import bcrypt from "bcryptjs";

const saltRounds = 10; // Salt rounds for bcrypt

// Function to hash a password
export const hashPass = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed. Please try again.");
    }
};

// Function to compare a plain password with the hashed password
export const authUser = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error("Error verifying password:", error);
        throw new Error("Password verification failed. Please try again.");
    }
};
