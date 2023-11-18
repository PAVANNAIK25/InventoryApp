import ProductModel from '../Models/product.model.js';


export default class ProductController {

    getProducts(req, res) {
        let products = ProductModel.get();
        res.render("products", { products: products });

    }

    getForm(req, res) {
        return res.render("addProduct", { errorMessage: null });
    }

    addNewProduct(req, res) {

        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render("products", { products: products });
    }

    updateProductView(req, res, next){
        
    }

}
