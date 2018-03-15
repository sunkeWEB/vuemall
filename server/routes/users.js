var express = require('express');
var router = express.Router();
require('./../utils/data');
const mongoose = require('mongoose');
const Users = require('./../models/users');
const Goods = require('./../models/goods');
const utility = require('utility');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  let {userName, userPwd} = {...req.body};
  userPwd = pwdmd5(userPwd);
  Users.findOne({userName, userPwd}, (err, userDoc) => {
    if (err) {
      res.json({
        code: 1,
        msg: '系统错误 登录失败',
        data: []
      });
    } else {
      if (userDoc) {
        res.cookie('usersid', userDoc._id, {
          path: '/',
          maxAge: 60000000
        });
        res.json({
          code: 0,
          msg: "登录成功",
          result: userDoc
        });
      } else {
        res.json({
          code: 1001,
          msg: "密码或者账号错误",
          result: []
        });
      }
    }
  })
});

router.post('/logout', (req, res) => {
  res.cookie('usersid', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    code: 0,
    msg: '退出成功',
    data: []
  });
});

router.post('/checklogin', (req, res) => {
  if (req.cookies.usersid) {
    Users.findOne({_id: req.cookies.usersid}, {userName: 100, _id: 0, cartList: 100}, (err, doc) => {
      if (doc) {
        res.json({
          code: 0,
          msg: '存在登录信息',
          result: doc
        });
      } else {
        res.json({
          code: 1,
          msg: '不存在登录信息',
          result: [],
          mm: "132"
        });
      }
    })
  } else {
    res.json({
      code: 1,
      msg: '不存在登录信息',
      result: [],
      kk: "456"
    });
  }
});

router.post('/payment', (req, res) => {
  let usersid = req.cookies.usersid;
  let {totalPrice, addersId} = {...req.body};
  Users.findOne({_id: usersid}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: '系统错误' + err,
        result: []
      });
    } else {
      let adders = ''; // 存收货信息
      doc.addressList.map(v => {
        if (v._id == addersId) {
          adders = v
        }
      });
      let order = []; //存商品信息
      order = doc.cartList.filter(v => v.checked === true);

      // 这里商品保存之后 清空购物车
      Users.update({_id: usersid}, {$pull: {cartList: {checked: true}}}, {multi: true}, (err4, doc4) => {
        if (err4) {
          res.json({
            code: 1,
            msg: '清空购物车失败',
            result: doc4
          });
        } else {
          let platform = 'sk';
          let r1 = Math.floor(Math.random() * 10);
          let r2 = Math.floor(Math.random() * 10);
          let sysDate = new Date().Format('yyyyMMddhhmmss');
          let createOrder = new Date().Format('yyyy-MM-dd hh:mm:ss');
          let orderid = platform + r1 + sysDate + r2;
          let orders = {
            orderid: orderid,
            totalPrice: totalPrice,
            adders: adders,
            goodslist: order,
            createTime: createOrder
          };
          doc.orderList.push(orders);
          doc.save((err1, doc1) => {
            if (err1) {
              res.json({
                code: 1,
                msg: '订单失败',
              });
            } else {
              res.json({
                code: 0,
                msg: '订单成功',
                result: orders
              });
            }
          })
        }
      });
    }
  });
});

router.get('/getorder', (req, res) => {
  let usersid = req.cookies.usersid;
  let {orderid} = {...req.query};
  if (usersid == '' || orderid == '') {
    res.json({
      code: 1001,
      msg: '参数错误',
      result: []
    });
  } else {
    Users.findOne({_id: usersid}, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: '系统错误',
          result: []
        });
      } else {
        let order = [];
        order = doc.orderList.filter(v => v.orderid == orderid)
        res.json({
          code: 0,
          msg: '获取订单数据成功',
          result: order
        });
      }
    });
  }
});

// 注册
router.post('/register', (req, res) => {
  let {userName, userPwd} = {...req.body};
  if (userName == '' || userPwd == '') {
    res.json({
      code: 1001,
      msg: '参数有误',
      result: []
    });
  } else {
    userPwd = pwdmd5(userPwd);
    Users.create({userName: userName, userPwd: userPwd}, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: '系统错误',
          result: []
        });
      } else {
        res.json({
          code: 0,
          msg: '注册成功',
          result: doc
        });
      }
    });
  }
});

function pwdmd5(value) {
  let plant = "QQ397633183_.China";
  return utility.md5(utility.md5(value + plant));
}

// 添加地址
router.post('/addadders', (req, res) => {
  let usersid = req.cookies.usersid;
  let {addername, phone, adders, code} = {...req.body};
  if (addername == '' || phone == '' || adders == '' || usersid == '') {
    res.json({
      code: 1001,
      msg: '参数错误',
      result: []
    });
  } else {
    Users.update({_id: usersid}, {
      $push: {
        'addressList': {
          userName: addername,
          tel: phone,
          isDefault: false,
          postCode: code,
          streetName: adders
        }
      }
    }, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: '系统错误',
          result: []
        });
      } else {
        res.json({
          code: 0,
          msg: '添加地址成功',
          result: doc
        });
      }
    });
  }
});

module.exports = router;
