import mongoose from 'mongoose';

export interface noteInterface
{
    user: mongoose.Types.ObjectId,
    title: string,
    content: string,
    tag: string,
    date: Date
}