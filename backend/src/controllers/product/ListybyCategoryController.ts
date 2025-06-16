import { Request, Response } from "express";
import { ListybyCategoryService } from "../../services/product/ListybyCategoryService";

class ListybyCategoryController{
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string;
        const listByCategory = new ListybyCategoryService();

        const products = await listByCategory.execute({
            category_id
        });

        return res.json(products)
    }

    
}

export {ListybyCategoryController};