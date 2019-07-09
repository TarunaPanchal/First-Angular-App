// const multer = require('multer');


// const DIR = './uploads';
 
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
//     }
// });
// var validate = function(req,file,cb)
// {
//  if(file.originalname.match(/\.(jpg|gif)$/))
//  {
//    return cb(null,true);
//  }
//  else{
//  return cb(null,false);
//  }
// }"ffdd@fmail.com"
// let upload = multer({storage: storage, 
//   limits: 1024 *1024 * 2 , fileFilter:validate});

// module.exports = upload;

var multer = require('multer');

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
         //console.log("reqqq" , req);
        console.log("--------" , file);



        cb(null, './Images');
    },
    filename: function (req, file, cb) {
      console.log("----1----" , file);

        cb(null, file.originalname);
        //console.log("fileeee" ,file);
    }
});

var filefilter = function (req, file, cb) {
  //console.log(" fileleeelellele ", file )
    if (file == undefined) {
        return cb(null, true);
    }
    else {
        if (file.fieldname == 'image') {
            if (file.originalname.match(/\.(gif|jpg)$/)) {
                return cb(null, true);
            }
            else {
                return cb({ status: 400, message: 'in image only image is allowed' });
            }
        }
        // else if (file.fieldname == 'myfile') {
        //     return cb(null, true);
        // }
       
    }
}
var upload = multer({
    storage: storage, limits: {
        filesize: 1024 * 1024 * 10
    }, fileFilter: filefilter
});

module.exports = upload; 