const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList:Array,
  cartList:[
    {
      productImage:String,
      salePrice:Number,
      productName:String,
      productId:Number,
      productNum:Number,
      checked:{
        type:Boolean, // 默认商品是被选中的
        default:true
      }
    }
  ],
  addressList:[
    {
      addressId:String,
      userName:String,
      streetName:String,
      postCode:String,
      tel:String,
      isDefault:Boolean
    }
  ]
});

module.exports = mongoose.model('users',usersSchema);
