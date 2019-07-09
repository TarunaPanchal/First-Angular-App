var mongoose = require('mongoose');
const usermodel = require('../Model/user');
const UserMaster = mongoose.model('users', usermodel.UserSchema);

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dao = require('../dao/baseDao');
class Usercontroller {

    async  insertUser(req, res) {
        var { firstname, lastname, username, password } = req.body;
        var a = req.file.path;
        var userData = {
            firstname: firstname,
            lastname: lastname,
            image: a,
            username: username,
            password: bcrypt.hashSync(password, 10)

        };
        const exit = await usermodel.findOne({ username })

        if (exit) {
            return res.json({
                success: false,
                message: "username Allready Use"
            })

        }

        usermodel.create(userData, (err, data) => {
            if (err) {
                res.send({ status: 400, message: err.message });
            }
            else {
                res.send({ status: 200, data: data });
            }
        });
    }

    login(req, res) {

        var user = { username: req.body.username };
        var pass = req.body.password;
        usermodel.findOne(user).then((data) => {

            bcrypt.compare(pass, data.password).then((result) => {
                if (result) {
                    const token = jwt.sign(user, 'abcdef', { expiresIn: '1h' });
                    res.send({ status: 200, data: token, id: data._id, role: data.role , disable : data.disable });
                }
                else {
                    res.send({ status: 400, message: " Wrong Password " });
                }

            }).catch((err) => {
                res.send({ status: 400, message: "Wrong Password " });
            });
        }).catch((err) => {
            res.send({ status: 400, message: "Username is not valid" });
        });

    }

    deleteUserById(req, res) {
        console.log("Deleteeee")
        usermodel.deleteOne({ _id: mongoose.Types.ObjectId(req.params.userId) }).then((data) => {
            res.send({ status: 200, data: data });
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });
    }

    getUserById(req, res) {
        console.log(' reqqqq', req.params.userId)
        usermodel.findOne({ _id: mongoose.Types.ObjectId(req.params.userId) }).then((data) => {
            console.log("dataaaaaa", data);
            res.send({ status: 200, data: data });
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });
    }

    findByIdAndUpdate(req, res) {

        var { firstname, lastname, username, password } = req.body;

        var userData = {
            firstname: firstname,
            lastname: lastname,
            username: username
        };
        //  var a = req.file.path;
        // userData['image'] = a;


        userData['image'] = req.file.path;



        if (req.file.fieldname == "image") {
            userData['image'] = req.file.path;
        }






        if (password) {
            userData['password'] = bcrypt.hashSync(password, 11);
        }
        else {
            console.log("-el--->", password);
        }
        usermodel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.userId) }, { $set: userData }).then((data) => {
            res.send({ status: 200, data: data });
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        })
    }

    // getUser(req,res){
    //     usermodel.find({}, (err, user) => {
    //         if (err)
    //             return res.send(err)
    //             console.log("userrr",user);
    //         return res.send(user);
    //     });
    // }

    getUser(req, res) {

        console.log('hello there')
        let userDao = new dao(UserMaster);
        let query = {
            role: "user"
        };

        let option = {
            sort: {
                'createdAt': -1
            }
        };
        var columnName = null
        var clumnValue = null
        var key = null
        var cname = null
        if (req.body['search[value]']) {
            query['$or'] = [];
        }
        // for global search
        for (let i = 0; i < 5; i++) {
            // for if null value
            if (req.body['search[value]']) {
    
                if (columnName = req.body['columns[' + i + '][data]']) {
                    columnName = req.body['columns[' + i + '][data]']
                    clumnValue = req.body['search[value]'];
                    key = columnName,
                        query['$or'].push({
                            [key]: {
                                $regex: clumnValue,
                                $options: 'i'
                            }
                        })
                }
    
            }
            if (req.body['order[0][column]'] == i) {
                cname = req.body['columns[' + i + '][data]'];
                option = {
                    sort: {
                        [cname]: (req.body['order[0][dir]   '] == 'asc') ? 1 : -1
                    }
                };
            }
        }
        // for column search 
        for (let i = 0; i < 3; i++) {
            if (req.body['columns[' + i + '][search][value]']) {
                if (columnName = req.body['columns[' + i + '][data]']) {
    
                    columnName = req.body['columns[' + i + '][data]']
                    clumnValue = req.body['columns[' + i + '][search][value]'];
    
                        key = columnName,
                            query[key] = {
                                $regex: clumnValue,
                                $options: 'i'
                            }
                }
            }
            if (req.body['order[0][column]'] == i) {
                cname = req.body['columns[' + i + '][data]'];
                option = {
                    sort: {
                        [cname]: (req.body['order[0][dir]'] == 'asc') ? 1 : -1
                    }
                };
            }
        }

        option['offset'] = parseInt(req.body['start']);
        option['limit'] = parseInt(req.body['length']);
        option['collation'] = { locale: "en_US", numericOrdering: true }

        userDao.findWithPeginate(query, option).then((data) => {
            res.send({ status: 200, data: data })
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });

       
        // let query = {
        //     role: "user"
        // };
        //  let option = {
        //     sort: {
        //         'createdAt': -1
        //     }
        // };
        // var columnName = null
        // var clumnValue = null
        // var key = null
        // var cname = null
        // if (req.body['search']['value']) {
        //     query['$or'] = [];
        // }

        // // for global search
        // for (let i = 0; i < 5; i++) {
        //     // for if null value
        //     if (req.body['search']['value']) {

        //         if (req.body['columns'][i]['data']) {
        //             columnName = req.body['columns'][i]['data']
        //             clumnValue = req.body['search']['value'];
        //             key = columnName,
        //                 query['$or'].push({
        //                     [key]: {
        //                         $regex: clumnValue,
        //                         $options: 'i'
        //                     }
        //                 })
        //         }

        //     }
        //     if (req.body['order'][0]['column'] == i) {
        //         cname = req.body['columns'][i]['data'];
        //         option = {
        //             sort: {
        //                 [cname]: (req.body['order'][0]['dir'] == 'asc') ? 1 : -1
        //             }
        //         };
        //     }
        // // }

        // option['offset'] = parseInt(req.body['start']);
        // option['limit'] = parseInt(req.body['length']);
        // option['collation'] = { locale: "en_US", numericOrdering: true }

        //  userDao.findWithPeginate(query).then((data) => {
        //     res.send({ status: 200, data: data })
        // }).catch((err) => {
        //     res.send({ status: 400, message: err.message });
        // });

        // let option;
        // var columnName = null
        // var clumnValue = null
        // var key = null
        // var cname = null
        // // if (req.body['search']['value']) {
        // //     query['$or'] = [];
        // // }

        // // for global search
        // for (let i = 0; i < 3; i++) {
        //     // for if null value
        //     // if (req.body['search']['value']) {

        //     // if (req.body['columns'][i]['data']) {
        //     //     columnName = req.body['columns'][i]['data']
        //     //     clumnValue = req.body['search']['value'];
        //     //     key = columnName,
        //     //         query['$or'].push({
        //     //             [key]: {
        //     //                 $regex: clumnValue,
        //     //                 $options: 'i'
        //     //             }
        //     //         })
        //     // }

        //     // }
        //     // if (req.body['order'][0]['column'] == i) {
        //     //     cname = req.body['columns'][i]['data'];
        //     //     option = {
        //     //         sort: {
        //     //             [cname]: (req.body['order'][0]['dir'] == 'asc') ? 1 : -1
        //     //         }
        //     //     };
        //     // }
        // }

        // // option['offset'] = 10;
        // // option['limit'] = 10;
        // // option['collation'] = { locale: "en_US", numericOrdering: true }
        // console.log(query)
        // userDao.findWithPeginate(query).then((result) => {
        //     console.log("dataaaaa", result)
        //     res.send({ status: 200, data: result })
        // }).catch((err) => {
        //     res.send({ status: 400, message: err.message });
        // });
    }

    // getAllData(req,res){
    //     console.log("GET DATA")
    //     usermodel.find({} , (err, user) => {
    //                 if (err)
    //                     return res.send(err)
    //                     console.log("userrr",user);
    //                 return res.send(user);
    //             });
    // }

    disableuser(req, res){
        usermodel.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.params.userId) }, { $set: {disable : true } }, {new: true} ).then((data) => {
            res.send({ status: 200, data: data  , disable : data.disable });
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        })

    }

}

var usercontroll = new Usercontroller();
module.exports = usercontroll;