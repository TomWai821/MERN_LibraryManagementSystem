import express from 'express';
import { UserRegisterRules, UserLoginRules, UserModifyDataRules } from '../model/expressBodyRules'
import { DeleteUser, BuildGetUserDataMessage, ModifyUserData, UserLogin, UserRegister, ChangeStatus, ModifyBanListData } from '../controller/userController';
import { FetchUserFromHeader } from '../controller/middleware/User/authMiddleware';
import { BanListValidation, CompareUserStatus, FoundUserFromParams, UserLoginDataValidation, UserRegisterDataValidation } from '../controller/middleware/User/userValidationMiddleware';
import { BuildQueryAndGetData } from '../controller/middleware/User/userGetDataMiddleware';
import { BuildUpdateData, DeleteBanListOrDeleteListData } from '../controller/middleware/User/userUpdateDataMiddleware';
import { LoginAndFindUser, ValidationForModifyStatus } from '../maps/routesMap';

const router = express.Router();

router.get('/UserData/tableName=:tableName', FetchUserFromHeader, BuildQueryAndGetData, BuildGetUserDataMessage);

router.post('/Register', UserRegisterRules, UserRegisterDataValidation, UserRegister);
router.post('/Login', UserLoginRules, UserLoginDataValidation, UserLogin);

// For another data
router.put('/UserData/id=:id', UserModifyDataRules, ...LoginAndFindUser, FoundUserFromParams, BuildUpdateData, ModifyUserData);

// For status only
router.put('/Status/id=:id', UserModifyDataRules, ...LoginAndFindUser, ...ValidationForModifyStatus, FoundUserFromParams, CompareUserStatus, DeleteBanListOrDeleteListData, ChangeStatus);
router.put('/BanListData/id=:id', UserModifyDataRules, ...LoginAndFindUser, FoundUserFromParams, BanListValidation, ModifyBanListData);

router.delete('/User/id=:id', ...LoginAndFindUser, FoundUserFromParams, DeleteUser);

module.exports = router;