import { Schema, model, Types } from 'mongoose';

interface IAction {
    userId: string,
    action: string,
    created: Date
    advertiser: Types.ObjectId;
}

const ActionSchema = new Schema<IAction>({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    action: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        trim: true,
    },
    advertiser: {
        type: Schema.Types.ObjectId,
        ref: 'Advertiser',
    },
});

export const Action = model<IAction>('Action', ActionSchema);