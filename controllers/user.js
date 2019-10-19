const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt')
let users = require('./../db').users;

class ProductController {

    list(req, res, next) {
        res.json(users);
    }

    create(req, res, next) {
        const hp = bcrypt.hashSync(req.body.password, 10)

        const newUser = { ...req.body, id: uuidv4(), password: hp };

        users.push(newUser);
        res.json(newUser);
    }

    login(req, res, next) {
        const nickname = req.body.nickname;
        const password = req.body.password;

        const user = users.filter(user => user.nickname === nickname)[0]

        const isAuthenticated = bcrypt.compareSync(password, user.password);

        if (isAuthenticated) {
            // CREAR UN JWT
            res.json({ token: '123123123213' })
        } else {
            res.status(401).send('Verifica tu password');
        }
    }
}

module.exports = ProductController;