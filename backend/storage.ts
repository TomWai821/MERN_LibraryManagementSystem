import { Request } from 'express';
import multer from 'multer';

type MulterFile = Express.Multer.File;

const storage = multer.diskStorage(
    {
        destination: (req:Request, file:MulterFile, callback:(error: Error | null, destination: string) => void) => 
        {
            callback(null, './backend/upload');
        },
        filename: (req:Request, file:MulterFile, callback:(error: Error | null, filename: string) => void) => 
        {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    }
)

const upload = multer({storage})

export default upload