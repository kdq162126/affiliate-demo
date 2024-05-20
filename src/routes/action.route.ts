import { Router } from 'express';
import * as controller from '../controllers/action.controller';

export const action = Router();

action.get('/list', controller.getActions)
action.post('/', controller.createAction);
