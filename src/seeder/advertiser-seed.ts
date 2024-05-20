// seeder.js
import FlexoffersService from '../services/flexoffers.service';
import { Advertiser } from '../models/advertiser.model';
import dotenv from 'dotenv';
import env from 'env-var';

import mongoose from 'mongoose';

dotenv.config();

const seedAdvertisers = async () => {
    try {
        // Initialize FlexoffersService
        const flexoffersService = new FlexoffersService();

        // Fetch advertisers from FlexOffers API
        const advertisers = await flexoffersService.getAdvertisers();

        // Connect to MongoDB
        await mongoose.connect(env.get('DB_URL').asString()!);

        // Iterate over fetched advertisers
        for (const advertiser of advertisers) {
            // Check if advertiser already exists in the database by ID
            const existingAdvertiser = await Advertiser.findOne({ id: advertiser.id });

            // If advertiser already exists, update it
            if (existingAdvertiser) {
                await Advertiser.findOneAndUpdate({ id: advertiser.id }, advertiser);
                console.log(`Advertiser with ID ${advertiser.id} updated successfully!`);
            } else {
                // If advertiser does not exist, create it
                await Advertiser.create(advertiser);
                console.log(`Advertiser with ID ${advertiser.id} created successfully!`);
            }
        }

        console.log('Advertisers seeded successfully!');
    } catch (error) {
        console.error('Error seeding advertisers:', error);
    } finally {
        // Close the MongoDB connection
        await mongoose.disconnect();
        // Exit the script
        process.exit();
    }
};

// Run the seeder function
seedAdvertisers();
