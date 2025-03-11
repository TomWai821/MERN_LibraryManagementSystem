import express from 'express';
import { UserRegisterRules, UserLoginRules, UserModifyDataRules } from '../model/expressBodyRules'
import { DeleteUser, BuildGetUserDataMessage, ModifyUserData, UserLogin, UserRegister, ChangeStatus, ModifyBanListData } from '../controller/userController';
import { AuthIdValidation, FetchUserFromHeader } from '../controller/middleware/authMiddleware';
import { BanListValidation, CompareUserStatus, DeleteListValidation, FoundUserFromParams, UserLoginDataValidation, UserRegisterDataValidation } from '../controller/middleware/userValidationMiddleware';
import { BuildQueryAndGetData } from '../controller/middleware/userGetDataMiddleware';
import { BuildUpdateData, DeleteBanListOrDeleteListData } from '../controller/middleware/userUpdateDataMiddleware';

const router = express.Router();
const LoginAsAdminAndFindUser = [FetchUserFromHeader, AuthIdValidation, FoundUserFromParams];
const ValidationForModifyStatus = [CompareUserStatus, BanListValidation, DeleteListValidation];

router.get('/UserData/tableName=:tableName', FetchUserFromHeader, BuildQueryAndGetData, BuildGetUserDataMessage);

router.post('/Register', UserRegisterRules, UserRegisterDataValidation, UserRegister);
router.post('/Login', UserLoginRules, UserLoginDataValidation, UserLogin);

// For another data
router.put('/UserData/id=:id', UserModifyDataRules, ...LoginAsAdminAndFindUser, BuildUpdateData, ModifyUserData);

// For status only
router.put('/Status/id=:id', UserModifyDataRules, ...LoginAsAdminAndFindUser, ...ValidationForModifyStatus, DeleteBanListOrDeleteListData, ChangeStatus);
router.put('/BanListData/id=:id', UserModifyDataRules, ...LoginAsAdminAndFindUser, BanListValidation, ModifyBanListData);

router.delete('/User/id=:id', ...LoginAsAdminAndFindUser, DeleteUser);

module.exports = router;