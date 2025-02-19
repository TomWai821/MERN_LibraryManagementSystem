import mongoose from 'mongoose';
import { PublisherInterface } from '../../model/bookSchemaInterface';

const publisherSchema = new mongoose.Schema<PublisherInterface>
(
    {
        _id: { type: String, require: true },
        publisher: {type: String, require:true},
        address: { type: String, require:true },
        phoneNumber: { type: String, require:true }
    }
)

const Publisher = mongoose.model<PublisherInterface>('Publisher', publisherSchema);