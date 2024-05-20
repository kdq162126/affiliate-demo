import { Schema, model } from 'mongoose';

interface IAdvertiser {
    id: number,
    name: string,
    country: string
    description: string
    domainUrl: string
    imageUrl: string
    deeplinkURL: string
    created: Date;
}

const AdvertiserSchema = new Schema<IAdvertiser>({
    id: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    domainUrl: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    deeplinkURL: {
        type: String,
        trim: true,
    },
    created: {
        type: Date,
        trim: true,
    },
});

export const Advertiser = model<IAdvertiser>('Advertiser', AdvertiserSchema);