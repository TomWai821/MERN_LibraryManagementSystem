import express from 'express';
import { UserRegisterRules, UserLoginRules, UserModifyDataRules } from '../model/expressBodyRules'
import { DeleteUser, BuildGetUserDataMessage, ModifyUserData, UserLogin, UserRegister, ChangeStatus, ModifyBanListData } from '../controller/userController';
import { AuthIdValidation, FetchUserFromHeader } from '../controller/middleware/authMiddleware';
import { FoundUserFromParams, UserLoginDataValidation, UserRegisterDataValidation } from '../controller/middleware/userMiddleware';
import { BuildQueryAndGetData } from '../controller/middleware/userGetDataMiddleware';
import { BuildUpdateData } from '../controller/middleware/userUpdateDataMiddleware';

const router = express.Router();
const LoginAsAdminAndFindUser = [FetchUserFromHeader, AuthIdValidation, FoundUserFromParams];

router.get('/userData/tableName=:tableName', FetchUserFromHeader, BuildQueryAndGetData, BuildGetUserDataMessage);

router.post('/register', UserRegisterRules, UserRegisterDataValidation, UserRegister);
router.post('/login', UserLoginRules, UserLoginDataValidation, UserLogin);

// For another data
router.put('/modifyData/id=:id', UserModifyDataRules, ...LoginAsAdminAndFindUser, BuildUpdateData, ModifyUserData);
// For status only
router.put('/modifyStatus/id=:id', UserModifyDataRules, ...LoginAsAdminAndFindUser, ChangeStatus);
router.put('/modifyBanList/id=:id', UserModifyDataRules, ...LoginAsAdminAndFindUser,ModifyBanListData);

router.delete('/remove/id=:id', ...LoginAsAdminAndFindUser, DeleteUser);

module.exports = router;