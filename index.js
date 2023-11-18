import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import expressLayouts from 'express-ejs-layouts';
import validateRequest from './src/middlewares/validation.middleware.js';

const server = express();

//using middleware to get data in body
//server.use(express.json());
server.use(express.urlencoded({ extended:true }));


server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// Layout Middleware
server.use(expressLayouts);
server.use(express.static('src/views'));

// creating instance of productcontroller
const productController = new ProductController();


//Routes

server.get("/", productController.getProducts);
server.get("/new", productController.getForm);
server.get("/update-product", productController.getUpdateProductView);
server.post("/new", validateRequest, productController.addNewProduct);

export default server;