import mongoose from 'mongoose';
import { DBUserInterface } from '../interface/dbInterface';

const UserSchema = new mongoose.Schema<DBUserInterface>
(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        gender: { type: String },
        birthDay: { type: String },
        role: { type: String },
        banned: { type: Boolean },
        createdAt: { type: Date, default: Date.now }
    }
);

const User = mongoose.model<DBUserInterface>('User', UserSchema);
export default User;