import multer from "multer"

const storage = multer.diskStorage({ 
  destination: "../../public/temp",
  filename: (req, file, cb) => { 
    cb(null, file.originalname); 
  } 
});

export const upload = multer({ storage })