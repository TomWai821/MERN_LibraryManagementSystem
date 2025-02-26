import mongoose from 'mongoose';
import { PublisherInterface } from '../../model/bookSchemaInterface';

const publisherSchema = new mongoose.Schema<PublisherInterface>
(
    {
        _id: { type: String, required: true },
        publisher: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Publisher = mongoose.model<PublisherInterface>('Publisher', publisherSchema);