'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释

// length of barcode
const len = 10;
const prom1 = 'BUY_TWO_GET_ONE_FREE';

function originCal(inputArray){
  let originData = [];
  let kindOfBarcode = [];

  for(let i = 0; i < inputArray.length; i++) {
    let barcode = inputArray[i], count = 1;
    if(barcode.length > len){
      count = barcode.substring(11, barcode.length)*1;
      barcode = barcode.substr(0, len);
    }

    let index = kindOfBarcode.indexOf(barcode);
    if(index > -1){
      originData[index].count += count;
    } else {
      originData.push({barcode: barcode, count: count});
      kindOfBarcode.push(barcode);
    }
  }

  return originData;
}

function improveData(originData){
  let allItems = loadAllItems();
  let info = [];

  for(let i = 0; i < originData.length; i++) {
    for(let j = 0; j < allItems.length; j++) {
      let oData = originData[i], item = allItems[j];
      if(oData.barcode === item.barcode) {
        info.push({barcode: item.barcode,
                   name   : item.name,
                   count  : oData.count,
                   unit   : item.unit,
                   price  : item.price,
                   cost    : oData.count * item.price})
      }
    }
  }
  return info;
}

function calculate(info) {
  let sum = 0;
  for(let i = 0; i < info.length; i++) {
    sum += info[i].cost;
  }

  return sum;
}

function promotions(info) {
  let prom = loadPromotions();
  let saved = 0;
  for(let i = 0; i < info.length; i++) {
    let inf = info[i];
    for(let j = 0; j < prom.length; j++) {
      if(prom[j].type === prom1){ // 买二送一

        if(prom[j].barcodes.indexOf(inf.barcode)>-1) {
          let num = parseInt(inf.count/3) * inf.price;
          inf.cost -= num;

          saved += num;
        }
      }else {}  // 其他折扣
    }
  }
  return saved;
}

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
