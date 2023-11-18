import ProductModel from '../Models/product.model.js';


export default class ProductController {

    getProducts(req, res) {
        let products = ProductModel.get();
        res.render("products", { products: products });

    }

    getForm(req, res) {
        return res.render("addProduct", { errorMessage: null });
    }

    // Add new product controller POST req

    addNewProduct(req, res) {
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render("products", { products: products });
    }

    // Update product view 

    getUpdateProductView(req, res, next){
        //1. if product exists
        const id = req.params.id;
        const productFound = ProductModel.getByID(id);

        if(productFound){
            return res.render("update-product", {product: productFound, errorMessage:null});
        }

        //2. return errors
        else{
            res.status(401).send('Product not found');
        }
    }

    // Update product POST req

    postUpdateProduct(req, res){
        ProductModel.update(req.body);
        let products = ProductModel.get();
        return res.render("products", { products: products });
    }

}
