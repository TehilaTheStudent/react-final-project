const express = require('express');
const user = require('./router/user')
const product = require('./router/product')
const order = require('./router/order')
const path = require('path');

const app = express();

const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs');
const multer = require('multer');


app.use(cors())
app.listen(4000, () => {
    console.log("listen port http://localhost:4000");
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {//middleware

    let text = new Date().toGMTString() + "  : " + req.url + '\n';
    fs.appendFile("log.txt", text, () => {
        next();
    })
})
//---image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a route to serve the image
app.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'uploads', imageName);

  // Check if the image file exists
  if (fs.existsSync(imagePath)) {
    // Send the image file as the response
    res.sendFile(imagePath);
  } else {
    // Image file not found
    res.status(404).send('Image not found');
  }
});

//midlewares finish here----

app.get('/', (req, res) => {
    res.send("hello world");
})

app.get('/person', (req, res) => {
    res.send("hello world person");
})

// app.use("/student", student);

app.use("/product", product);
app.use("/order", order);
app.use("/user", user);

app.use((req, res, next) => {
    //all the non-matching-urls goes here!
    let text = new Date().toGMTString() + "  : " + req.url + '\n';
    fs.readFile("404.html", 'utf-8', (err, data) => {
        res.status(404).send(data);//get html file- displays in google!
    })
})