
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        console.log('🎁🎁')
        //console.log(file)
        const product = JSON.parse(req.body.product); // Parse the product object from JSON string
        const imageName = product.imageName;
        const timestamp = new Date()//'10.4.2024-9:44:25'//Date.now()
        const fileExtension = file.originalname.split('.').pop();
        const hour = timestamp.getHours()
        const minute = timestamp.getMinutes()
        const second = timestamp.getSeconds()
        const year = timestamp.getFullYear()
        const month = timestamp.getMonth() + 1
        const day = timestamp.getDate()
        const newFilename = `${imageName}-${day}.${month}.${year}_${hour}.${minute}.${second}.${fileExtension}`;
        //  const newFilename = `${productId}.${fileExtension}`;
        // console.log('end of func')
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

exports.post = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {

        upload.single('file')(req, res, (err) => {
            //המרה של טקסט למערך
            let products = JSON.parse(data);
            console.log(req.body)
            // מוסיף איידי למוצר החדש 
            const id = products[products.length - 1].id + 1
            console.log('🥛')
            //console.log(req.file)

            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: err.message });
            } else if (err) {
                console.log('err')
                return res.status(500).json({ error: err.message });
            }

            if (!req.file) {
                console.log('!req.file')
                return res.status(400).json({ error: 'No file uploaded.' });
            }
            console.log('pass the ifs')
            const { imageName, ...product } = JSON.parse(req.body.product); // Parse the product object from JSON string
            console.log(product)
            console.log(imageName)
            // const productName = product.name.replace(/\s+/g, '-'); // Replace spaces with dashes
            // const imageName = product.imageName;
            const fileExtension = req.file.originalname.split('.').pop();
            const timestamp = new Date()//'10.4.2024-9:44:25'//Date.now()
            const hour = timestamp.getHours()
            const minute = timestamp.getMinutes()
            const second = timestamp.getSeconds()
            const year = timestamp.getFullYear()
            const month = timestamp.getMonth() + 1
            const day = timestamp.getDate()
            const newFilename = `${imageName}-${day}.${month}.${year}_${hour}.${minute}.${second}`;

            //  const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${productId}-${timestamp}.${fileExtension}`;
            const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${newFilename}.${fileExtension}`;

            // const updatedProduct = {
            //     ...product,
            //     imgUrl
            // };

            // const { id, name, description, content, price, isCooling, company, prodDate } = req.body;
            const newProduct = { id, ...product, imgUrl };
            console.log(newProduct)
            // Send the response with name, age, and imageUrl
            products.push(newProduct);
            fs.writeFile("products.json", JSON.stringify(products), (err) => {
                if (err) {
                    res.status(500).send("error  in add products ");
                } else {
                    res.send(newProduct);
                }
            })
        });

    })
}
exports.put = (req, res) => {


    fs.readFile("products.json", "utf-8", (err, data) => {

        upload.single('file')(req, res, (err) => {

            let products = JSON.parse(data);

            let id = req.params.id;
            let existingProductIndex = products.findIndex(st => st.id == id)
            const existingProduct = products[existingProductIndex]
            const { imageName, ...product } = JSON.parse(req.body.product);



            if (!req.file) {
                //update and want the previous, dont change
                console.log('no file🚫 ')
                //dont change: imgUrl
                const newProduct = { id, ...product, imgUrl: existingProduct.imgUrl };
                products.splice(existingProductIndex, 1, newProduct)

                fs.writeFile("products.json", JSON.stringify(products), (err) => {
                    if (err) {
                        res.status(500).send("error  in add products ");
                    } else {
                        res.send(newProduct);
                    }
                })
            }
            else {
                console.log('i got a file!👍🏻')
                //delete the previous!

                // Get the image file path based on the productId
                const existingFileName = existingProduct.imgUrl.substring(existingProduct.imgUrl.lastIndexOf('/') + 1); 
                existingProduct.imgUrl.substring(existingProduct.imgUrl.lastIndexOf('/') + 1);
                const imagePath = path.join(__dirname, '../uploads', `${existingFileName}`); // Adjust the file extension as needed
                console.log()
                // Check if the image file exists
                if (fs.existsSync(imagePath)) {
                    // Delete the image file
                    fs.unlinkSync(imagePath);
                    console.log(`Image ${existingFileName} deleted.`);
                } else {
                    console.log(`Image ${existingFileName}  not found.`);
                }


                if (err instanceof multer.MulterError) {
                    return res.status(500).json({ error: err.message });
                } else if (err) {
                    //console.log('err')
                    return res.status(500).json({ error: err.message });
                }

                if (!req.file) {
                    //  console.log('!req.file')
                    return res.status(400).json({ error: 'No file uploaded.' });
                }
                // console.log('pass the ifs')



                const fileExtension = req.file.originalname.split('.').pop();
                const timestamp = new Date()
                const hour = timestamp.getHours()
                const minute = timestamp.getMinutes()
                const second = timestamp.getSeconds()
                const year = timestamp.getFullYear()
                const month = timestamp.getMonth() + 1
                const day = timestamp.getDate()
                const newFilename = `${imageName}-${day}.${month}.${year}_${hour}.${minute}.${second}`;

                const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${newFilename}.${fileExtension}`;


                const newProduct = { id, ...product, imgUrl };
                products.splice(existingProductIndex, 1, newProduct)

                fs.writeFile("products.json", JSON.stringify(products), (err) => {
                    if (err) {
                        res.status(500).send("error  in add products ");
                    } else {
                        res.send(newProduct);
                    }
                })
            }
        });


    })
}
// exports.put = (req, res) => {

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let products = JSON.parse(data);
//         //the id
//         let id = req.params.id;
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         //sended product
//         let existingProductIndex = products.findIndex(st => st.id == id)
//         if (existingProductIndex == -1) {
//             res.status(500).send("not found student by tz " + id);
//         } else {

//             let product = req.body
//             product.id = id;

//             products.splice(existingProductIndex, 1, product)
//             fs.writeFile("products.json", JSON.stringify(products), (err) => {
//                 if (err) {
//                     res.status(500).send("error  in add products ");
//                 } else {
//                     res.send(product);
//                 }
//             })
//         }
//     })
// }
function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}




//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
