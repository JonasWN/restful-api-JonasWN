const products = [{
        sku: "34234l",
        name: "Feta",
        description: "Feta er Super Lækkert",
        price: 26.50,
        weight: 250
    },
    {
        sku: "483482i",
        name: "Lillebror",
        description: "Lillebror er Super ungdomligt",
        price: 15,
        weight: 20
    },
    {
        sku: "434e23",
        name: "Gorgonzola",
        description: "Gorgonzola er sprødt",
        price: 40.95,
        weight: 300
    }
]


const ProductRef = require("../models/product.module");

exports.getAllProducts = (req, res) => {
    ProductRef.get().then(docs => {
        let data = []
        docs.forEach(doc => {
            data.push(doc.data());
        })
        res.json(data);
    });
}


exports.getSingleProduct = (req, res) => {
    ProductRef.where("sku", "==", req.params.sku).get()
        .then(docs => {
            docs.forEach(doc => res.json(doc.data()))
        });
};

exports.deleteProduct = (req, res) => {
    ProductRef.where("sku", "==", req.params.sku).get()
        .then(docs => {
            docs.forEach(doc => doc.ref.delete())
            res.status(204).end();
        })
}


// update

exports.UpdateProducts = (req, res) => {

    if (req.fields.price) {
        req.fields.price = parseFloat(req.fields.price);
    }
    if (req.fields.weight) {
        req.fields.weight = parseFloat(req.fields.weight);
    }

    ProductRef.where("sku", "==", req.params.sku).get()
        .then(docs => {
            docs.forEach(doc => doc.ref.update({
                    ...req.fields
                }).get()
                .then(doc => res.json(doc.data()))
            );
        })
}

// create

exports.createProduct = (req, res) => {

    req.fields.price = parseFloat(req.fields.price);
    req.fields.weight = parseFloat(req.fields.weight);
    ProductRef.add({
            ...req.fields
        })
        .then(ref => {
            ref.get().then(doc => res.status(201).json(doc.data()))
        })
        .catch(error => res.json(error));
};