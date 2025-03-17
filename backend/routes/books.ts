import express from 'express';
import { GetDefination, CreateDefinationData, EditDefinationData, DeleteDefinationData } from '../controller/definationController';
import { LoginAndFindUser } from '../maps/routesMap';
import { CreateBookRecord, GetAllBook } from '../controller/bookController';

const router = express.Router();

// For defination
router.get('/defination/type=:type', GetDefination);
router.post('/defination/type=:type', ...LoginAndFindUser, CreateDefinationData);
router.put('/defination/type=:type', ...LoginAndFindUser, EditDefinationData);
router.delete('/defination/type=:type', ...LoginAndFindUser, DeleteDefinationData);

// For books
router.get('/BookData', GetAllBook);
router.post('/BookData', CreateBookRecord);

module.exports = router;