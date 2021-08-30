const Cart = require('./cart');

exports.addToCart = (req,res,next)=>{
    console.log('inside AddToCart inside Controller in backend, the data is ');
    console.log(req.body);
    const items = req.body.cart;
    //console.log(item);
    //const cart = new Cart(item.id, item.price, item.quantity, item.totalPrice, item.title);
    Cart.save(items);
    res.send({ok:true});
}

exports.getCartItems = (req, res, next)=>{
    Cart.getCart((items)=>{
        res.send(items);
    })
}