const uuidv4 = require('uuid/v4');
let products = require('./../db').products;

class ProductController {

    list(req, res, next) {
        res.json(products);
    }

    create(req, res, next) {
        const newProduct = { ...req.body, id: uuidv4() };
        products.push(newProduct);
        res.json(newProduct);
    }

    update(req, res, next) {
        const filterProduct = products.filter(product => product.id === req.params.id)[0];

        const updatedProduct = { ...filterProduct, ...req.body  };

        res.json(updatedProduct);
    }

    delete(req, res, next) {
        const filterProduct = products.filter(product => product.id === req.params.id)[0];

        const productsWithoutSelected = products.filter(product => product.id !== req.params.id)[0];

        products = productsWithoutSelected;

        res.json(filterProduct);
    }
}

module.exports = ProductController;