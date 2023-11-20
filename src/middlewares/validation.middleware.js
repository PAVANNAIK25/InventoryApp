import { body, validationResult } from "express-validator";
const validateRequest = async (req, res, next) => {

    //1. setup rules

    const rules = [
        body('name').isLength({min : 5}).withMessage("Name cannot be empty or less than 5 characters"),
        body('desc').isLength({min : 10}).withMessage("Description cannot be empty or less than 10 characters"),
        body('price').isFloat({ gt : 0 }).withMessage("Price should be a positive number"),
        body('imageUrl').custom(((value, { req })=>{
            if(!req.file){
                throw new Error("Image is required");
            }
            return true;
        })),
        // body('imageUrl').isURL().withMessage("Please enter valid URL")  
    ];

    // 2. running rules

    await Promise.all(rules.map((rule) => rule.run(req)));

    //3. check if you

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.render("addProduct", { errorMessage: validationErrors.array()[0].msg });
    }
    next();
}

export default validateRequest;