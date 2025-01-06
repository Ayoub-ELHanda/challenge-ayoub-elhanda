import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

export const User = model('User', userSchema);
