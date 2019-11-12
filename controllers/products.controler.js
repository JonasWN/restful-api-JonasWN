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


const {
    log
} = require("../middleware/logger");

const ProductRef = require("../models/product.module");





// exports.getAllProducts = (req, res) => {
//     ProductRef.get().then(docs => {
//         let data = []
//         docs.forEach(doc => {
//             data.push(doc.data());
//         })
//         res.json(data);
//     });
// }


// exports.getSingleProduct = (req, res) => {
//     ProductRef.where("sku", "==", req.params.sku).get()
//         .then(docs => {
//             docs.forEach(doc => res.json(doc.data()))
//         });
// };

// exports.deleteProduct = (req, res) => {
//     ProductRef.where("sku", "==", req.params.sku).get()
//         .then(docs => {
//             docs.forEach(doc => doc.ref.delete())
//             res.status(204).end();
//         })
// }




// update

// exports.UpdateProducts = (req, res) => {

//     if (req.fields.price) {
//         req.fields.price = parseFloat(req.fields.price);
//     }
//     if (req.fields.weight) {
//         req.fields.weight = parseFloat(req.fields.weight);
//     }

//     ProductRef.where("sku", "==", req.params.sku).get()
//         .then(docs => {
//             docs.forEach(doc => doc.ref.update({
//                     ...req.fields
//                 }).get()
//                 .then(doc => res.json(doc.data()))
//             );
//         })
// }

// create

// exports.createProduct = (req, res) => {

//     req.fields.price = parseFloat(req.fields.price);
//     req.fields.weight = parseFloat(req.fields.weight);
//     ProductRef.add({
//             ...req.fields
//         })
//         .then(ref => {
//             ref.get().then(doc => res.status(201).json(doc.data()))
//         })
//         .catch(error => res.json(error));
// };




// async await 


exports.singleProduct = async function (req, res) {

    try {
        const docs = await ProductRef.where("sku", "==", req.params.sku)
            .limit(1)
            .get();
        docs.forEach(doc => res.json(doc.data()));
    } catch (error) {
        res.status(500).end();
        log.error(error)
    }
}

// Get all products async
exports.getAllProducts = async function (req, res) {
    try {
        const results = [];
        const docs = await ProductRef.get()
        docs.forEach(doc => results.push(doc.data()));
        res.json(results);
    } catch (error) {
        res.status(500).end();
        log.error(error.stack);
    }
};


// DELETE Async
exports.deleteProduct = async (req, res) => {

    try {
        const docs = await ProductRef.where("sku", "==", req.params.sku).limit(1).get();
        docs.forEach(doc => doc.ref.delete());

    } catch (error) {
        res.status(500).end();
        log.error(error)
    }
}

// CREATE Async
exports.createProduct = async function (req, res) {
    try {
        req.fields.price = parseFloat(req.fields.price)
        req.fields.weight = parseFloat(req.fields.weight)
        const ref = await ProductRef.add({
            ...req.fields
        })
        const doc = await ref.get();
        res.status(201).json(doc.data())
    } catch (error) {
        log.error(error.stack);
        res.status(500).end();
    }
};


exports.UpdateProducts = async function (req, res) {
    if (req.fields.price) {
        req.fields.price = parseFloat(req.fields.price);
    }
    if (req.fields.weight) {
        req.fields.weight = parseFloat(req.fields.weight);
    }
    try {
        const docs = await ProductRef.where("sku", "==", req.params.sku).limit(1).get();
        docs.forEach(async doc => {
            try {
                doc.ref.update({
                    ...req.fields
                });
                const result = await doc.ref.get();
                res.json(result.data())
            } catch (error) {
                log.error(error.stack);
                res.status(500).end();
            }
        })
    } catch (error) {

    }
}