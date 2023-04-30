const multer = require("multer")
const crypto = require("crypto")
const uploadConfig = require("../config/upload")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploadConfig.path)
    },
    filename: (req, file, cb)=>{
        // Ira pegar a extensão do arquivo 
        const extension = file.originalname.split(".")[1];

        // Ira gerar uma string randomica 
        const newName = crypto.randomBytes(13).toString("hex");

        // Altera o nome do arquivo para a string randomica 
        cb(null, `${newName}.${extension}`);
    },
});

const upload = multer({ storage });

module.exports = upload