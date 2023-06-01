const express = require("express");
const app = express();
const cors = require('cors')
const errorHandler = require('./middleware/error-handler');
const path = require('path')
const multer = require("multer")
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/department', require('./controllers/department-controller'));
app.use('/api/role', require('./controllers/role-controller'));
app.use('/api/employee', require('./controllers/employee-controller'));
app.use('/api/dashboard', require('./controllers/dashboard-controller'));
app.use('/api/asset', require('./controllers/asset-controller'));
app.use('/api/gender', require('./controllers/gender-controller'));
app.use('/api/maritalstatus', require('./controllers/maritalstatus-controller'));
app.use('/api/bloodgroup', require('./controllers/bloodgroup-controller'));
app.use('/api/auth', require('./controllers/auth-controller'));
app.use(errorHandler)
var xlsxtojson = require("xlsx-to-json-lc");

const maxSize = 1 * 1000 * 1000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        fileFullName = file.originalname
        let fileNameArr = file.originalname.split(".")
        let fileName = fileNameArr[0]
        let fileExtension = fileNameArr[1]
        cb(null, fileName + "." + fileExtension)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        const allowedFileExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.xls', ".xlsx", ".csv", '.txt'];
        const fileExtension = path.extname(file.originalname)
        if (allowedFileExtensions.some(x => x == fileExtension)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg, .pdf, .xls, .xlsx, ".csv", and .txt formats are allowed!'));
        }
    }
}).single("file");

app.post('/api/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        var exceltojson = xlsxtojson;
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: false
            }, function (err, result) {
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                }
                res.json({ error_code: 0, err_desc: null, data: result });
            });
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })
});

// const migrations = require("./migrations");

// migrations().then(function () {
//     console.log("Migrations completed");
// });
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
app.listen(port, () => console.log('Server listening on port ' + port));