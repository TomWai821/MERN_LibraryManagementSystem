import express from 'express';
import { UserRegisterRules, UserLoginRules, UserModifyDataRules } from '../model/expressBodyRules'
import { DeleteUser, GetUserData, ModifyUserData, UserLogin, UserRegister } from '../controller/userController';
import { AdminAuthIdValidation, FetchUser } from '../controller/middleware/authMiddleware';
import { FoundUserFromParams, UserLoginDataValidation, UserRegisterDataValidation } from '../controller/middleware/userMiddleware';
import { BuildQueryAndGetData } from '../controller/middleware/userGetDataMiddleware';
import { BuildUpdateData } from '../controller/middleware/userUpdateDataMiddleware';

const router = express.Router();

router.get('/userData/tableName=:tableName', FetchUser, BuildQueryAndGetData, GetUserData);

router.post('/register', UserRegisterRules, UserRegisterDataValidation, UserRegister);
router.post('/login', UserLoginRules, UserLoginDataValidation, UserLogin);

router.put('/modifyData/id=:id', UserModifyDataRules, FetchUser, AdminAuthIdValidation, FoundUserFromParams, BuildUpdateData, ModifyUserData);

router.delete('/remove/id=:id', FetchUser, AdminAuthIdValidation, FoundUserFromParams, DeleteUser);

module.exports = router;