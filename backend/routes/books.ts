import express from 'express';
import { GetDefination, CreateDefinationData, EditDefinationData, DeleteDefinationData } from '../controller/definationController';
import { LoginAndFindUser } from '../Arrays/routesMap';
import { CreateBookRecord, DeleteBookRecord, EditBookRecord, GetBookRecord } from '../controller/bookController';
import { BookGenreIDAndLanguageIDValidation, BookNameValidation, BookRecordIDValidation } from '../controller/middleware/Book/BookvalidationMiddleware';
import { BookCreateRules } from '../model/expressBodyRules';
import { BuildBookQueryAndGetData } from '../controller/middleware/Book/bookGetDataMiddleware';

const router = express.Router();

// For defination
router.get('/defination/type=:type', GetDefination);
router.post('/defination/type=:type', ...LoginAndFindUser, CreateDefinationData);
router.put('/defination/type=:type', ...LoginAndFindUser, EditDefinationData);
router.delete('/defination/type=:type', ...LoginAndFindUser, DeleteDefinationData);

// For book records
router.get('/BookData/tableName=:tableName', BuildBookQueryAndGetData, GetBookRecord);
router.post('/BookData', BookCreateRules, ...LoginAndFindUser, BookNameValidation, BookGenreIDAndLanguageIDValidation, CreateBookRecord);
router.put('/BookData/id=:id', ...LoginAndFindUser, BookRecordIDValidation, BookGenreIDAndLanguageIDValidation, EditBookRecord);
router.delete('/BookData/id=:id', ...LoginAndFindUser, BookRecordIDValidation, DeleteBookRecord);

module.exports = router;