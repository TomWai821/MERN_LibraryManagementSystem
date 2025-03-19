import { Request, Response } from "express"
import { CreateGenre, FindGenreByIDAndDelete, FindGenreByIDAndUpdate, GetGenre } from "../schema/book/genre";
import { CreateLanguage, FindLanguageByIDAndDelete, FindLanguageByIDAndUpdate, GetLanguage } from "../schema/book/language";

export const GetDefination = async (req: Request, res: Response) => 
{
    const definationType = req.params.type as keyof typeof definationHandlers;
    let success = false;

    if (!definationHandlers[definationType]) 
    {
        return res.status(404).json({ success, error: `Invalid type: ${definationType}` });
    }

    try 
    {
        const getData = await definationHandlers[definationType].getAll();
        if (!getData) 
        {
            return res.status(400).json({ success, error: `Failed to get ${definationType} data` });
        }

        success = true;
        return res.json({ success, foundDefination: getData });
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const CreateDefinationData = async (req: Request, res: Response) => 
{
    const definationType = req.params.type as keyof typeof definationHandlers;
    const { genre, language, shortName } = req.body;
    let success = false;

    if (!definationHandlers[definationType]) 
    {
        return res.status(404).json({ success, error: `Invalid type: ${definationType}` });
    }

    try 
    {
        if (definationType === "Genre" && language) 
        {
            return res.status(400).json({ success, error: `Invalid data type in JSON file: language` });
        }

        if (definationType === "Language" && genre) 
        {
            return res.status(400).json({ success, error: `Invalid data type in JSON file: genre` });
        }

        const createData = await definationHandlers[definationType].create({ genre, language, shortName });

        if (!createData) 
        {
            return res.status(400).json({ success, error: `Failed to create ${definationType}` });
        }

        success = true;
        return res.json({ success, message: `Create ${definationType} successfully!` });
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const EditDefinationData = async (req: Request, res: Response) => 
{
    const definationType = req.params.type as keyof typeof definationHandlers;
    const { id, genre, language, shortName } = req.body;
    let success = false;

    if (!definationHandlers[definationType]) 
    {
        return res.status(404).json({ success, error: `Invalid type: ${definationType}` });
    }

    try 
    {
        if (definationType === "Genre" && language) 
        {
            return res.status(400).json({ success, error: `Invalid data type in JSON file: language` });
        }

        if (definationType === "Language" && genre) 
        {
            return res.status(400).json({ success, error: `Invalid data type in JSON file: genre` });
        }

        const editData = await definationHandlers[definationType].update(id,{ genre, language, shortName });

        if (!editData) 
        {
            return res.status(400).json({ success, error: `Failed to Edit ${definationType} data!` });
        }

        success = true;
        return res.json({ success, message: `Update ${definationType} data successfully!` });
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};
    
export const DeleteDefinationData = async (req: Request, res: Response) => 
{
    const definationType = req.params.type as keyof typeof definationHandlers;
    const { id } = req.body;
    let success = false;

    if (!definationHandlers[definationType]) 
    {
        return res.status(404).json({ success, error: `Invalid type: ${definationType}` });
    }

    try 
    {
        const deleteData = await definationHandlers[definationType].delete(id);

        if (!deleteData) 
        {
            return res.status(400).json({ success, error: `Failed to Delete ${definationType} data!` });
        }

        success = true;
        return res.json({ success, message: `Delete ${definationType} data successfully!` });
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

const definationHandlers = 
{
    Genre:
    {
        getAll:GetGenre,
        create:CreateGenre,
        update:FindGenreByIDAndUpdate,
        delete:FindGenreByIDAndDelete
    },
    Language:
    {
        getAll:GetLanguage,
        create:CreateLanguage,
        update:FindLanguageByIDAndUpdate,
        delete:FindLanguageByIDAndDelete
    }
}