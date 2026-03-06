import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: [true, 'Please provide a name.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address.',
        ],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message.'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
