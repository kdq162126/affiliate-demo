import type { Request, Response } from 'express';
import { Advertiser } from "../models/advertiser.model";

export const getAdvertisers = async (req: Request, res: Response) => {
    try {
        const advertisers = await Advertiser.find();
        res.status(200).json(advertisers);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
