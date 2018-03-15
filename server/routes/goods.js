const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Goods = require('./../models/goods');
const Users = require('./../models/users');
// mongodb连接数据库
mongoose.connect('mongodb://sunke:china123@127.0.0.1:3322/mall?authSource=admin');
mongoose.connection.on('connected', () => {
  console.log("连接数据库成功");
});
mongoose.connection.on('error', () => {
  console.log("数据库连接失败");
})
mongoose.connection.on('disconnected', () => {
  console.log("数据库断开连接");
})

// 查询商品列表
router.get('/list', (req, res) => {
  let {sort, page, pageSize, startprice, endprice} = {...req.query};
  let params = {};
  if (startprice === 'all' || endprice === 'all') {
  } else {
    params = {salePrice: {$gte: parseFloat(startprice), $lt: parseFloat(endprice)}}
  }
  let sorts = {};
  let goodsModel = Goods.find(params);
  if (sort == -1 || sort == 1) {
    sorts = {salePrice: sort}
  }
  goodsModel.sort(sorts).skip((parseInt(page) - 1) * parseInt(pageSize)).limit(parseInt(pageSize));
  goodsModel.exec((err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: err
      });
    } else {
      res.json({
        code: 0,
        msg: '',
        result: {
          length: doc.length,
          data: doc
        }
      });
    }
  });
});

// 加入到购物车
router.post('/addcart', (req, res) => {
  const usersid = req.cookies.usersid; // 获取到用户登录的信息 id
  const productId = req.body.productId; // 商品的id
  Users.find({_id: usersid}, (err, userDoc) => {
    if (err) {
      res.json({
        code: 1,
        msg: err.message,
        data: []
      });
    } else {
      if (userDoc) {
        Goods.findOne({productId: productId}, (err1, productDoc) => {
          if (err1) {
            res.json({
              code: 1,
              err: 'mm',
              msg: err1.message,
              data: []
            });
          } else {
            if (productDoc) {
              let oldcard = [];
              oldcard = userDoc[0].cartList.filter(v => v.productId == productId)
              if (oldcard.length > 0) { // 代表商品存在 只需要数量添加1 就可以
                userDoc[0].cartList.map(v => {
                  if (v.productId == productId) {
                    v.productNum++;
                  }
                })
                userDoc[0].save((err2, doc) => {
                  if (err2) {
                    res.json({
                      code: 1,
                      err: 'kk',
                      msg: err2.message,
                      data: productDoc
                    });
                  } else {
                    if (doc) {
                      res.json({
                        code: 0,
                        msg: '添加成功',
                        result: doc
                      });
                    }
                  }
                })
              } else {  // 用户的商品列表里面不存在商品 添加记录
                productDoc._doc.productNum = 1;
                userDoc[0].cartList.push(productDoc);
                userDoc[0].save((err2, doc) => {
                  if (err2) {
                    res.json({
                      code: 1,
                      err: 'kk',
                      msg: err2.message,
                      data: productDoc
                    });
                  } else {
                    if (doc) {
                      res.json({
                        code: 0,
                        msg: '添加成功',
                        result: doc
                      });
                    }
                  }
                })
              }
            }
          }
        })
      }
    }
  });
});

// 获取购物车列表
router.get('/cartlist', (req, res) => {
  let usersid = req.cookies.usersid;
  Users.findOne({_id: usersid}, {cartList: 1000, _id: 0}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: "系统错误",
        result: []
      });
    } else {
      res.json({
        code: 0,
        msg: '获取购物车数据成功',
        result: doc
      });
    }
  })
});

// 删除商品
router.get('/delcart', (req, res) => {
  let {productId} = {...req.query};
  let usersid = req.cookies.usersid;
  Users.update({_id: usersid}, {$pull: {cartList: {productId}}}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: "系统错误",
        result: []
      });
    } else {
      res.json({
        code: 0,
        msg: "删除成功",
        result: doc
      });
    }
  });
});

// 商品添加
router.post('/addcartnum', (req, res) => {
  let userid = req.cookies.usersid;
  let {productId, productNum, checked} = {...req.body};
  Users.update({_id: userid, 'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: '系统错误501',
        result: []
      });
    } else {
      res.json({
        code: 0,
        msg: '修改商品数量成功',
        result: doc
      });
    }
  });
});

//全选
router.post('/editcheckAll', (req, res) => {
  let usersid = req.cookies.usersid;
  let {checked} = {...req.body};
  console.log("checked" + checked);
  Users.findOne({_id: usersid}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: '系统错误501',
        result: []
      });
    } else {
      doc.cartList.map(v => {
        v.checked = checked;
      });
      doc.save((err1, doc1) => {
        if (err) {
          res.json({
            code: 1,
            msg: '系统错误501',
            result: []
          });
        } else {
          res.json({
            code: 0,
            msg: '修改商品数量成功',
            result: doc
          });
        }
      })
    }
  });
});

// 查询地址
router.get('/adderslist', (req, res) => {
  let usersid = req.cookies.usersid;
  Users.findOne({_id: usersid}, {addressList: 10000, _id: 0}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: "系统错误502",
        result: []
      });
    } else {
      res.json({
        code: 0,
        msg: '获取地址成功',
        result: doc
      });
    }
  })
});

// 设置默认地址
router.post('/setdefaultadder', (req, res) => {
  let usersid = req.cookies.usersid;
  let {addersid} = {...req.body};
  console.log(usersid,addersid);
  Users.findOne({_id: usersid}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: '系统错误1'+err,
        result: []
      });
    } else {
      let adderssList = doc.addressList;
      adderssList.map(v => {
        if (addersid == v._id) {
          v.isDefault = true;
        } else {
          v.isDefault = false;
        }
      });
      doc.save((err1, doc1) => {
        if (err1) {
          res.json({
            code: 1,
            msg: '系统错误2',
            result: []
          });
        } else {
          res.json({
            code: 0,
            msg: '默认地址设置成功',
            result: doc1
          });
        }
      })
    }
  });
});

// 删除地址
router.post('/deladders', (req, res) => {
  let usersid = req.cookies.usersid;
  let {addressId} = {...req.body};
  Users.update({_id: usersid}, {$pull: {addressList: {_id:addressId}}}, (err, doc) => {
    if (err) {
      res.json({
        code:1,
        msg:"系统错误",
        result:[]
      });
    }else {
      res.json({
        code:0,
        msg:"地址删除成功",
        result:doc
      });
    }
  });
});

module.exports = router;
