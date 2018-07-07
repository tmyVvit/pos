'use strict';
const {formatBarcodeLists, calculateBarcodeCountLists, buildCartItems, buildDiscountItems, calculateSubtotal, calculateTotalCost, calculateSaved, buildReceiptsString, getReceipts, printReceipt} = require("../main/main")
const {loadAllItems, loadPromotions} = require("../main/fixtures")


describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

/*
describe('#1. formatBarcodeLists test', () => {

  it('should get format barcode lists and it\'s count', function () {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const hoped_barcode_lists = JSON.stringify([{barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1},
                                                {barcode:'ITEM000003',count:2.5},
                                                {barcode:'ITEM000005',count:1},{barcode:'ITEM000005',count:2}]);

    const barcodeLists = JSON.stringify(formatBarcodeLists(tags));
    expect(barcodeLists).toBe(hoped_barcode_lists);
  });
});



describe('#2. calculateBarcodeCountLists test', () => {

  it('should get format barcode lists and it\'s count', function () {

    const barcodeLists = [{barcode:'ITEM000001',count:1},
      {barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1},
      {barcode:'ITEM000003',count:2.5},
      {barcode:'ITEM000005',count:1},{barcode:'ITEM000005',count:2}];
    const hopd_barcode_count_lists = JSON.stringify([{barcode:'ITEM000001',count:5},{barcode:'ITEM000003',count:2.5},{barcode:'ITEM000005',count:3}]);

    let barcodeCountLists = JSON.stringify(calculateBarcodeCountLists(barcodeLists));


    expect(barcodeCountLists).toBe(hopd_barcode_count_lists);
  });
}); */


describe('#3. buildCartItems test', () => {

  it('should build the information of cartItems', function () {
    const barcodeLists = [{barcode:'ITEM000001',count:5},
                          {barcode:'ITEM000003',count:2.5},
                          {barcode:'ITEM000005',count:3}];

    const hoped_cart_items = JSON.stringify([
      {barcode: "ITEM000001", count: 5,name: "雪碧", unit: "瓶", price: 3},
      {barcode: "ITEM000003", count: 2.5, name: "荔枝", unit: "斤", price: 15},
      {barcode: "ITEM000005", count: 3, name: "方便面", unit: "袋", price: 4.5}]);

    const cartItems = buildCartItems(barcodeLists);


    expect(JSON.stringify(cartItems)).toBe(hoped_cart_items);
  });
});
/*
describe('#4. buildDiscountItems test', () => {

  it('should build the information of discount items', function () {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const barcodeLists = formatBarcodeLists(tags);


    const barcodeCountLists = calculateBarcodeCountLists(barcodeLists)
    const cartItems = buildCartItems(barcodeCountLists);
    const discountItems = buildDiscountItems(cartItems);

    const hoped_discount_items = JSON.stringify([
      {barcode: "ITEM000001", discount: 3},
      {barcode: "ITEM000005", discount: 4.5}]);

    expect(JSON.stringify(discountItems)).toBe(hoped_discount_items);
  });
});

describe('#5. calculateSubtotal test', () => {

  it('should add subTotal to cartItems', function () {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const hoped_cart_items_include_subTotal = JSON.stringify([
      {barcode: "ITEM000001", name: "雪碧", count: 5, unit: "瓶", price: 3, subTotal: 12},
      {barcode: "ITEM000003", name: "荔枝", count: 2.5, unit: "斤", price: 15, subTotal: 37.5},
      {barcode: "ITEM000005", name: "方便面", count: 3, unit: "袋", price: 4.5, subTotal: 9}]);

    const barcodeLists = formatBarcodeLists(tags);
    const barcodeCountLists = calculateBarcodeCountLists(barcodeLists);
    const cartItems = buildCartItems(barcodeCountLists);
    const discountItems = buildDiscountItems(cartItems);
    const cartItemsCopy = calculateSubtotal(cartItems, discountItems)



    expect(JSON.stringify(cartItemsCopy)).toBe(hoped_cart_items_include_subTotal);
  });
});

describe('#6. calculateTotalCostal test', () => {

  it('should calculate the total cost', function () {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const barcodeLists = formatBarcodeLists(tags);
    const barcodeCountLists = calculateBarcodeCountLists(barcodeLists);
    const cartItems = buildCartItems(barcodeCountLists);
    const discountItems = buildDiscountItems(cartItems);
    const cartItemsFinal = calculateSubtotal(cartItems, discountItems);
    const totalCost = calculateTotalCost(cartItemsFinal);

    const hoped_total_cost = JSON.stringify(58.5);

    expect(JSON.stringify(totalCost)).toBe(hoped_total_cost);
  });
});

describe('#7. calculateSaved test', () => {

  it('should calculate saved money', function () {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const hoped_saved  = JSON.stringify(7.5);

    const barcodeLists = formatBarcodeLists(tags);
    const barcodeCountLists = calculateBarcodeCountLists(barcodeLists);
    const cartItems = buildCartItems(barcodeCountLists);
    const discountItems = buildDiscountItems(cartItems);
    const cartItemsFinal = calculateSubtotal(cartItems, discountItems);
    //const totalCost = calculateTotalCost(cartItemsFinal);
    const saved = calculateSaved(discountItems);


    expect(JSON.stringify(saved)).toBe(hoped_saved);
  });
});

describe('#8. buildReceiptsString test', () => {

  it('should get the final receipts string', function () {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const hoped_receipts_string_first_receipts = JSON.stringify({name:  '雪碧', count: '5', unit : '瓶', price: '3.00', subTotal: '12.00'});
    //    const hoped_receipts_string  = {
    //  receipts : [{name:  "雪碧", count: "5", unit : "瓶", price: "3.00", subTotal: "12.00"},
    //              {name: "荔枝", count: "2.5", unit : "斤", price: "15.00", subTotal: "37.50"},
    //              {name: "方便面", count: "3", unit : "袋", price: "4.50", subTotal: "9.00"}],
    //  totalCost: "58.50",
    //  saved    : "7.50"
    //};

    const barcodeLists = formatBarcodeLists(tags);
    const barcodeCountLists = calculateBarcodeCountLists(barcodeLists);
    const cartItems = buildCartItems(barcodeCountLists);
    const discountItems = buildDiscountItems(cartItems);
    const cartItemsFinal = calculateSubtotal(cartItems, discountItems);
    const totalCost = calculateTotalCost(cartItemsFinal);
    const saved = calculateSaved(discountItems);
    const receiptsString = buildReceiptsString(cartItems, totalCost, saved);



    expect(JSON.stringify(receiptsString.receipts[0])).toBe(hoped_receipts_string_first_receipts);
  });
});

*/
