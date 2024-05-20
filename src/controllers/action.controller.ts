import type { Request, Response } from 'express';
import { Action } from "../models/action.model";
import { Advertiser } from "../models/advertiser.model";

export const getActions = async (req: Request, res: Response) => {
    try {
        const actions = await Action.find().sort({ created: -1 }).populate('advertiser');
        res.status(200).json(actions);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createAction = async (req: Request, res: Response) => {
    try {
        const { userId, action, advertiserId } = req.body;

        // Validate required fields
        if (!userId || !action || !advertiserId) {
            return res.status(400).json({ message: 'userId, action, and advertiserId are required' });
        }

        // Verify that the advertiser exists
        const advertiser = await Advertiser.findById(advertiserId);
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }

        // Create a new action
        const newAction = new Action({
            userId,
            action,
            advertiser: advertiser._id,
            created: new Date(),
        });

        // Save the action to the database
        await newAction.save();

        res.status(201).json(newAction);
    } catch (error) {
        console.error('Error creating action:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

