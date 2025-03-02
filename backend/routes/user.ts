import express from 'express';
import { UserRegisterRules, UserLoginRules, UserChangeDataRules } from '../model/expressBodyRules'
import { DeleteUser, GetUserData, ModifyUserData, UserLogin, UserRegister } from '../controller/userController';
import { FetchUser, Validate } from '../controller/middleware';

const router = express.Router();

router.get('/userData/tableName=:tableName', FetchUser, GetUserData);

router.post('/register', UserRegisterRules, Validate, UserRegister);
router.post('/login', UserLoginRules, Validate, UserLogin);

router.put('/modifyData/id=:id', FetchUser, ModifyUserData);

router.delete('/remove/id=:id', FetchUser, DeleteUser);

module.exports = router;