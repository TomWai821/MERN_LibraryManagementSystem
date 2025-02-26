import mongoose from 'mongoose';
import { RoleInterface } from '../../model/userSchemaInterface';

const RoleSchema = new mongoose.Schema<RoleInterface>
(
    {
        _id: { type: String, required: true },
        role: { type: String, required: true },
    }
)

const Role = mongoose.model<RoleInterface>('Role', RoleSchema);