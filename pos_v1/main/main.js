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

function calculateSubtotal(cartItems, discountItems) {
  const cartItemsFinal = cartItems.concat();
  for(let cartItem of cartItemsFinal) {
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
  return cartItemsFinal;
}

function calculateTotalCost(cartItems) {
  let totalCost = 0;
  for (let cartItem of cartItems){
    totalCost += cartItem.subTotal;
  }
  return totalCost;
}

function calculateSaved(discountItems) {
  let saved = 0;
  for (let discountItem of discountItems) {
    saved += discountItem.discount;
  }

  return saved;
}

function buildReceiptsString(cartItemsFinal, totalCost, saved) {

  const receipts = [];
  for(let carItem of cartItemsFinal) {
    receipts.push({
      name: carItem.name,
      count: carItem.count.toString(),
      unit : carItem.unit,
      price: carItem.price.toFixed(2).toString(),
      subTotal: carItem.subTotal.toFixed(2).toString()
    });
  }
  const totalCostString = totalCost.toFixed(2).toString();
  const savedString = saved.toFixed(2).toString();
  const receiptsString = {receipts,
                          totalCost: totalCostString,
                          saved    : savedString};

  return receiptsString;
}

function getReceipts(receiptsString) {
  let receiptsText = "";

  for(let item of receiptsString.receipts) {
    receiptsText += "\n";
    receiptsText += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price}(元)，小计：${item.subTotal}(元)`;
  }

  const finalText = `***<没钱赚商店>收据***${receiptsText}
----------------------
总计：${receiptsString.totalCost}(元)
节省：${receiptsString.saved}(元)
**********************`;

  return finalText;

}


function printReceipt(tags) {
  let barcodeLists = formatBarcodeLists(tags);
  let cartItems = buildCartItems(barcodeLists);
  let discountItems = buildDiscountItems(cartItems);
  let cartItemsFinal = calculateSubtotal(cartItems, discountItems);
  let totalCost = calculateTotalCost(cartItems);
  let saved = calculateSaved(discountItems);
  let receiptsString = buildReceiptsString(cartItemsFinal, totalCost, saved);

  console.log(getReceipts(receiptsString));

}
