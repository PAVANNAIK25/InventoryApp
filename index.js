import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import expressLayouts from 'express-ejs-layouts';
import validateRequest from './src/middlewares/validation.middleware.js';
import { upload } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';

const server = express();

//using middleware to get data in body
//server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// Layout Middleware
server.use(express.static("public"));
server.use(expressLayouts);
server.use(express.static('src/views'));

// creating instance of productcontroller
const productController = new ProductController();
const userController = new UserController();

// Get Routes
server.get("/", productController.getProducts);
server.get("/new", productController.getForm);
server.get("/update-product/:id", productController.getUpdateProductView);
server.get("/register", userController.userRegistration);
server.get("/login", userController.userLogin);

// POST Routes
server.post("/delete-product/:id", productController.deleteProduct);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);

server.post("/new", upload.single('imageUrl'), validateRequest, productController.addNewProduct);

server.post("/update-product", upload.single('imageUrl'), validateRequest, productController.postUpdateProduct);

export default server;
