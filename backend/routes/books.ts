import express from 'express';
import upload from '../storage';
import { GetDefinition, CreateDefinitionData, EditDefinitionData, DeleteDefinitionData } from '../controller/definitionController';
import { LoginAndFindUser } from '../Arrays/routesMap';
import { CreateBookRecord, DeleteBookRecord, EditBookRecord, GetBookImage, GetBookRecord } from '../controller/bookController';

import { BookCreateRules } from '../model/expressBodyRules';
import { BuildBookQueryAndGetData, BuildSuggestBookQueryAndGetData } from '../controller/middleware/Book/bookGetDataMiddleware';
import { DefinitionDataValidation, DefinitionTypeValidation } from '../controller/middleware/Definition/DefinitonValidationMiddleware';
import { CreateContactRecord, DeleteContactRecord, GetContactRecord, UpdateContactRecord } from '../controller/contactController';
import { ContactDataValidation, ContactTypeValidation } from '../controller/middleware/Contract/ContactValidationMiddleware';
import { CreateLoanBookRecord, GetLoanBookRecord, UpdateLoanBookRecord } from '../controller/loanBookController';
import { BookGenreIDAndLanguageIDValidation, BookNameValidation, BookRecordIDValidation, FoundBookLoanRecord } from '../controller/middleware/Book/bookValidationMiddleware';
import { FetchUserFromHeader } from '../controller/middleware/User/authMiddleware';

const router = express.Router();

// For definition
router.get('/definition/type=:type', DefinitionTypeValidation, GetDefinition);
router.post('/definition/type=:type', ...LoginAndFindUser, DefinitionTypeValidation, DefinitionDataValidation, CreateDefinitionData);
router.put('/definition/type=:type', ...LoginAndFindUser, DefinitionTypeValidation, DefinitionDataValidation, EditDefinitionData);
router.delete('/definition/type=:type', ...LoginAndFindUser, DefinitionTypeValidation, DeleteDefinitionData);

// For book records
router.get('/BookData', BuildBookQueryAndGetData, GetBookRecord);
router.post('/BookData', upload.single("image"), BookCreateRules, ...LoginAndFindUser, BookNameValidation, BookGenreIDAndLanguageIDValidation, CreateBookRecord);
router.put('/BookData/id=:id', ...LoginAndFindUser, BookRecordIDValidation, BookGenreIDAndLanguageIDValidation, EditBookRecord);
router.delete('/BookData/id=:id', ...LoginAndFindUser, BookRecordIDValidation, DeleteBookRecord);

// For book records
router.get('/LoanBook', FetchUserFromHeader, GetLoanBookRecord);
router.post('/LoanBook', ...LoginAndFindUser, CreateLoanBookRecord);
router.put('/LoanBook/id=:id', ...LoginAndFindUser, FoundBookLoanRecord, UpdateLoanBookRecord);

// For Suggest Book
router.get('/BookData/type=:type', FetchUserFromHeader, BuildSuggestBookQueryAndGetData, GetBookRecord);
router.get('/LoanBook/type=:type', FetchUserFromHeader, GetLoanBookRecord);

// For publisher and author
router.get('/contact/type=:type', ContactTypeValidation, GetContactRecord);
router.post('/contact/type=:type', ...LoginAndFindUser, ContactTypeValidation, ContactDataValidation, CreateContactRecord);
router.put('/contact/type=:type', ...LoginAndFindUser, ContactTypeValidation, ContactDataValidation, UpdateContactRecord);
router.delete('/contact/type=:type', ...LoginAndFindUser, ContactTypeValidation, ContactDataValidation, DeleteContactRecord);

// For image
router.get("/uploads/:filename", GetBookImage);

module.exports = router;