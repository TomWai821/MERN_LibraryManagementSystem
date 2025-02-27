import express from 'express';
import { UserRegisterRules, UserLoginRules, UserChangeDataRules } from '../model/expressBodyRules'
import { ChangeUserData, GetUserData, UserLogin, UserRegister } from '../controller/userController';
import { FetchUser, Validate } from '../controller/middleware';

const router = express.Router();

router.post('/register', UserRegisterRules, Validate, UserRegister);
router.post('/login', UserLoginRules, Validate, UserLogin);
router.put('/changeData/id=:id', UserChangeDataRules, FetchUser, ChangeUserData);
router.get('/userData', FetchUser, GetUserData);

module.exports = router;