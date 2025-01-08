import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPass = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed.");
    }
};

export const authUser = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        throw new Error("Password verification failed.");
    }
};
