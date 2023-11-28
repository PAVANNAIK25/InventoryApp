import UserModel from "../Models/user.model.js";
import ProductModel from "../Models/product.model.js";

export default class UserController {

    userRegistration(req, res) {
        res.render("user-registration");
    }

    userLogin(req, res) {
        res.render("login", {errorMessage: null});
    }

    postRegister(req, res) {
        UserModel.addUser(req.body);
        res.render("login", { errorMessage: null });
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const result = UserModel.authenticateUser(email, password);
        if (!result) {
            return res.render("login", { errorMessage: "Invalid Credentials" })
        }
        const products = ProductModel.get();
        return res.render("products", { products: products });

    }
}