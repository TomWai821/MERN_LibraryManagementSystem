import { AuthIdValidation, FetchUserFromHeader } from "../controller/middleware/User/authMiddleware";
import { BanListValidation, DeleteListValidation } from "../controller/middleware/User/userValidationMiddleware";

export const LoginAndFindUser = [FetchUserFromHeader, AuthIdValidation];
export const ValidationForModifyStatus = [BanListValidation, DeleteListValidation];