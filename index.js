import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import expressLayouts from 'express-ejs-layouts';
import validateRequest from './src/middlewares/validation.middleware.js';
import { upload } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const server = express();

//using middleware to get data in body
//server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());


server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

// Layout Middleware
server.use(express.static("public"));
server.use(expressLayouts);
server.use(express.static('src/views'));
server.use(session({
    secret:"secretKey",
    saveUninitialized: true,
    resave: false,
    cookie:{secure:false}
}));

// creating instance of productcontroller
const productController = new ProductController();
const userController = new UserController();

// Get Routes
server.get("/", auth, setLastVisit, productController.getProducts);
server.get("/new", auth, productController.getForm);
server.get("/update-product/:id", auth,  productController.getUpdateProductView);
server.get("/register", userController.userRegistration);
server.get("/login", userController.userLogin);
server.get("/logout", userController.logout);

// POST Routes
server.post("/delete-product/:id", auth,  productController.deleteProduct);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);

server.post("/new", auth, upload.single('imageUrl'), validateRequest, productController.addNewProduct);

server.post("/update-product", auth, upload.single('imageUrl'), validateRequest, productController.postUpdateProduct);

export default server;
