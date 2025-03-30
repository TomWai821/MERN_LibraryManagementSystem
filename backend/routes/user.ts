import express from 'express';
import { UserRegisterRules, UserLoginRules, UserModifyDataRules } from '../model/expressBodyRules'
import { DeleteUser, GetUserData, ChangeUserData, UserLogin, UserRegister, ChangeStatus, ModifySuspendListData } from '../controller/userController';
import { FetchUserFromHeader } from '../controller/middleware/User/authMiddleware';
import { SuspendListValidation, CompareUserStatus, FoundUserFromParams, UserLoginDataValidation, UserRegisterDataValidation } from '../controller/middleware/User/userValidationMiddleware';
import { BuildUserQueryAndGetData } from '../controller/middleware/User/userGetDataMiddleware';
import { BuildUpdateData, DeleteSuspendListOrDeleteListData } from '../controller/middleware/User/userUpdateDataMiddleware';
import { LoginAndFindUser, ValidationForModifyStatus } from '../Arrays/routesMap';

const router = express.Router();

router.get('/UserData/tableName=:tableName', FetchUserFromHeader, BuildUserQueryAndGetData, GetUserData);

router.post('/Register', UserRegisterRules, UserRegisterDataValidation, UserRegister);
router.post('/Login', UserLoginRules, UserLoginDataValidation, UserLogin);

// For another data
router.put('/UserData/id=:id', UserModifyDataRules, ...LoginAndFindUser, FoundUserFromParams, BuildUpdateData, ChangeUserData);

// For status only
router.put('/Status/id=:id', UserModifyDataRules, ...LoginAndFindUser, ...ValidationForModifyStatus, FoundUserFromParams, CompareUserStatus, DeleteSuspendListOrDeleteListData, ChangeStatus);
router.put('/SuspendListData/id=:id', UserModifyDataRules, ...LoginAndFindUser, FoundUserFromParams, SuspendListValidation, ModifySuspendListData);

router.delete('/User/id=:id', ...LoginAndFindUser, FoundUserFromParams, DeleteUser);

module.exports = router;