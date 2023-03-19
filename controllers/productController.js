const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const ApiError = require("../error/ApiError");

class ProductController {
    async create(req, res, next) {
        try {
            const {name, price, typeId} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, typeId, image: fileName})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (Number(typeId) === 0) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (Number(typeId) !== 0) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id}
            }
        )
        return res.json(product)
    }

    async getNewCollection(req, res) {
        let limit = 3
        let products;
        products = await Product.findAll({limit})
        return res.json(products)
    }
}

module.exports = new ProductController()