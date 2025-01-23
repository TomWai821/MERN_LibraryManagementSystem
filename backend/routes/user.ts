import express from 'express';
import { UserRegister, UserLogin, UserChangeData, GetUserData } from '../controller/userController';
import { FetchUser, Validate } from '../controller/middleware';
import { UserRegisterRules, UserLoginRules, UserChangeDataRules } from '../model/expressBodyRules'

const router = express.Router();

router.post('/register', UserRegisterRules, Validate, UserRegister);
router.post('/login', UserLoginRules, Validate, UserLogin);
router.put('/changeData/id=:id', UserChangeDataRules, FetchUser, UserChangeData);
router.get('/userData', FetchUser, GetUserData);
module.exports = router;