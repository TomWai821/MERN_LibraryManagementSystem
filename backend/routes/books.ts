import express from 'express';
import { GetDefination, CreateDefinationData, EditDefinationData, DeleteDefinationData } from '../controller/definationController';
import { LoginAndFindUser } from '../maps/routesMap';

const router = express.Router();

router.get('/defination/type=:type', GetDefination);

router.post('/defination/type=:type', ...LoginAndFindUser, CreateDefinationData);

router.put('/defination/type=:type', ...LoginAndFindUser,EditDefinationData);

router.delete('/defination/type=:type', ...LoginAndFindUser,DeleteDefinationData);

module.exports = router;