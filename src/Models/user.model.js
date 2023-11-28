
export default class UserModel {

    constructor(id, name, email, password) {
        this.id = id,
            this.name = name,
            this.email = email,
            this.password = password
    }

    static addUser(userObj) {
        const newUser = new UserModel(users.length + 1, userObj.name, userObj.email, userObj.password);
        users.push(newUser);
    }

    static getUser(email) {
        const index = users.findIndex((user) => email == user.email);
        return users[index];
    }

    static authenticateUser(email, password) {
        const result = users.find((user) => email == user.email && password == user.password);
        return result;
    }
}

let users = [];