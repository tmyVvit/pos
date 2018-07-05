'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释

// length of barcode
const LEN_OF_BARCODE = 10;
const PROMOTION_1 = 'BUY_TWO_GET_ONE_FREE';

function formatBarcodeLists(tags) {
  let barcodeLists = [];
  let kindOfBarcode = [];

  for (let tag of tags) {
    let barcode = tag;
    let count = 1;
    if (tag.length > LEN_OF_BARCODE) {
      count = parseFloat(barcode.substring(LEN_OF_BARCODE+1, barcode.length));
      barcode = barcode.substr(0, LEN_OF_BARCODE);
      //barcode = tag.slice("-")[0];
      //count = parseFloat(tag.slice("-")[1]);
    }
    let index = kindOfBarcode.indexOf(barcode);
    if (index > -1) {
      barcodeLists[index].count += count;
    } else {
      barcodeLists.push({
        barcode,
        count
      });
      kindOfBarcode.push(barcode);
    }

  }
  //console.info("barcodeLists: ");
  //console.info(barcodeLists);
  return barcodeLists;
}

function buildCartItems(barcodeLists) {
  const allItems = loadAllItems();
  let cartItems = [];

  for (let barcodeList of barcodeLists){
    for (let item of allItems){
      if(barcodeList.barcode === item.barcode) {
        cartItems.push({
          barcode: item.barcode,
          name   : item.name,
          count  : barcodeList.count,
          unit   : item.unit,
          price  : item.price
        });
      }
    }
  }
  //console.info("cartItems: ");
  console.info(cartItems);
  return cartItems;
}
function buildDiscountItems(cartItems) {
  const promotions = loadPromotions();
  let discountItems = [];

  for (let promotion of promotions) {
    if(promotion.type !== PROMOTION_1){
      continue;
    }

    for (let cartItem of cartItems) {
      for(let barcode of promotion.barcodes){
        if(cartItem.barcode === barcode) {
          let discount = parseInt(cartItem.count / 3) * cartItem.price;
          discountItems.push({
            barcode : cartItem.barcode,
            discount: discount
          })
        }
      }
    }
  }
  //console.info("discountItems: ");
  //console.info(discountItems);
  return discountItems;

}

/*function calculateSubtotal(cartItems, discountItems) {
  const cartItemsCopy = cartItems.concat();
  for(let cartItem of cartItemsCopy) {
    let saved = 0;
    for (let discountItem of discountItems) {
      if (cartItem.barcode === discountItem.barcode) {
        saved = discountItem.discount;
        break;
      }
    }
    cartItem.subTotal = cartItem.count * cartItem.price - saved;
  }
  //console.info(cartItems)
  return cartItemsCopy;
}*/

function print(info, sum, saved){

  let frontDetail = "***<没钱赚商店>收据***\n";
  //let rearDetail = "----------------------\n总计：{sum}(元)\n节省：{saved}(元)\n**********************";
  //let itemDetail = "名称：{name}，数量：{count}{unit}，单价：{price}(元)，小计：{cost}(元)\n";
  let items = "";

  items += frontDetail;
  for(let i = 0; i < info.length; i++){
    let count = info[i].count;
    let price = info[i].price;
    let cost = info[i].cost;
    let item = "名称："+info[i].name+"，数量："+count+info[i].unit+"，单价："+price.toFixed(2)+"(元)，小计："+cost.toFixed(2)+"(元)\n";
    items += item;
  }

  items += "----------------------\n总计："+(sum-saved).toFixed(2)+"(元)\n节省："+saved.toFixed(2)+"(元)\n**********************";

  return items;
}

function printReceipt(inputArray) {
  let originData = originCal(inputArray);
  let info = improveData(originData);

  let sum = calculate(info);


  let saved = promotions(info);

  console.log(print(info, sum, saved));

}
