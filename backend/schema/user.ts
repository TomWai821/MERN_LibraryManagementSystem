import mongoose from 'mongoose';
import { userInterface } from '../interface/dbInterface';

const UserSchema = new mongoose.Schema<userInterface>
(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        createdAt: { type: Date, default: Date.now }
    }
);

const User = mongoose.model<userInterface>('User', UserSchema);
export default User;