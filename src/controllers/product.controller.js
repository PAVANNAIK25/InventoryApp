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
        const {name, desc, price} = req.body;
        const imageUrl = "images/" + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
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
        const imageUrl = "images/" + req.file.filename;
        ProductModel.update(req.body, imageUrl);

        let products = ProductModel.get();
        return res.render("products", { products: products });
    }

    // delete Product
    deleteProduct(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getByID(id);
        if(!productFound){
            return res.status(401).send('Product not found');
        }
        ProductModel.delete(id);
        let products = ProductModel.get();
        res.render("products", { products: products });
    }

}
