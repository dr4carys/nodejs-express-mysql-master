const uploadFile = require("../middleware/upload");
const lokalist= require("../models/lokalist.model.js")

exports.upload = async (req, res) => {
    // console.log("ini reqnya",req.file.originalname )
  try {
    await uploadFile(req, res);
  
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    console.log("aku coba",res.statusCode)
    if(res.statusCode === 200){
        const data1= new lokalist({
            ip_address:req.body.ip_address,
            label : req.body.label,
            id_user : req.body.id_user,
            gambar: __basedir + "resources/" +req.file.originalname

        });
        lokalist.create(data1,(err,data)=>{
            if(err){
                res.status(500).send({
                    status_code:500,
                    message:"gagal"
                })

            }else res.send({
                status_code :200,
                message:"berhasil",
            })


        })

    }
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

exports.getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resource/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

exports.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resource/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

// module.exports = {
//   upload,
//   getListFiles,
//   download,
// };