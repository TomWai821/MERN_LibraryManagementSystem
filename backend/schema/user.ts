import { model, now, Schema } from 'mongoose';
import { userInterface } from '../interface/UserInterface';

const UserSchema = new Schema<userInterface>
(
    {
        name: { Types: String, required: true },
        email: { Types: String, required: true, unique: true },
        password: { Types: String, required: true },
        date: { Types: Date, default: now }
    }
);

export const User = model<userInterface>('user', UserSchema);
module.exports = User;