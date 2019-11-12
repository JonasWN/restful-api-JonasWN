const {
    getAllProducts,
    singleProduct,
    deleteProduct,
    UpdateProducts,
    createProduct
} = require("../controllers/products.controler");

module.exports = (router) => {
    router.options("/products", (req, res) => {
        res.header("Allow", "OPTIONS, GET, POST");
        res.status(204);
        res.end();
    });

    router.get("/products", getAllProducts);

    router.get("/products/:sku", singleProduct);

    router.delete("/products/:sku", deleteProduct);

    router.patch("/products/:sku", UpdateProducts);

    router.post("/products", createProduct);
};