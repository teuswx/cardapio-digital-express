import { Request, Response } from "express";
import { CreateproductService } from "../../services/product/CreateProductService";

class CreateProductController{
    async handle(req: Request, res: Response){
        const {name, price, description, category_id} = req.body;
        const createProductService = new CreateproductService();
        
        if(!req.file){
            throw new Error("error, upload file")
        }else{

            const {originalname, filename: banner} = req.file;
            const product = await createProductService.execute({
            name,
            price,
            description,
            banner,
            category_id
            });
            return res.json(product)
        }

        

       
    }
}

export {CreateProductController}