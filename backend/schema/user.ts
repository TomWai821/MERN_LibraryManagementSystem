import mongoose from 'mongoose';
import { DBUserInterface } from '../model/dbInterface';

const UserSchema = new mongoose.Schema<DBUserInterface>
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

const User = mongoose.model<DBUserInterface>('User', UserSchema);
export default User;