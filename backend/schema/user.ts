import mongoose from 'mongoose';
import { UserInterface } from '../model/dbInterface';

const UserSchema = new mongoose.Schema<UserInterface>
(
    {
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        gender: { type: String, require: true },
        birthDay: { type: String, require: true },
        role: { type: String, require: true },
        status: { type: String, require: true },
        createdAt: { type: Date, default: Date.now }
    }
);

const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;