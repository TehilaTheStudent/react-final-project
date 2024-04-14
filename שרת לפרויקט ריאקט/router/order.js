const express = require('express');
const router = express.Router();
const controllerOrder = require('../controller/order')//controllerOrder is an object with the methods impelemtation


router.get("/", controllerOrder.get);
router.get("/:id", controllerOrder.getById);
router.post("/", controllerOrder.post);
router.delete('/:id',controllerOrder.delete)
module.exports = router;