const path = require('path');
const fs = require('fs');
const { builtinModules } = require('module');
const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

const getProductsFromFile = (cb)=>{
    fs.readFile(p, (err, fileContent)=>{
        if(err)
        {
            console.log('error occured in reading the file');
            cb([]);
        }
        else
        {
            if(fileContent.length>0)
            {
                cb(JSON.parse(fileContent));
            }
            else
            {
                cb([]);
            }
        }
    })
}

module.exports = class Cart{

    constructor(id,price,quantity,totalPrice,name)
    {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.name = name;
    }

    static save(items)
    {
        console.log('inside save method in cart model, the data is ');
        console.log(items);
        const obj = {...items};
        fs.writeFile(p, JSON.stringify(obj),err=>{
            if(err)
                console.log(err);
            else
                return;
        });
    }

    static getCart(cb)
    {
        getProductsFromFile(cb);
    }

    
}