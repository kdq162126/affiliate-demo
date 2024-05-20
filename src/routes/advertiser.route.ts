import { Router } from 'express';
import * as controller from '../controllers/advertiser.controller';

export const advertiser = Router();

advertiser.get('/list', controller.getAdvertisers);
