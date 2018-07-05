'use strict';

/*describe('pos', () => {

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
});*/

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
    const hoped_barcode_lists = JSON.stringify([{barcode:'ITEM000001',count:5},
                                                {barcode:'ITEM000003',count:2.5},
                                                {barcode:'ITEM000005',count:3}]);

    const barcodeLists = JSON.stringify(formatBarcodeLists(tags));
    expect(barcodeLists).toBe(hoped_barcode_lists);
  });
});

describe('#2. buildCartItems test', () => {

  it('should build the information of cartItems', function () {
    const barcodeLists = [{barcode:'ITEM000001',count:5},
                          {barcode:'ITEM000003',count:2.5},
                          {barcode:'ITEM000005',count:3}];

    const hoped_cart_items = JSON.stringify([
      {barcode: "ITEM000001", name: "雪碧", count: 5, unit: "瓶", price: 3},
      {barcode: "ITEM000003", name: "荔枝", count: 2.5, unit: "斤", price: 15},
      {barcode: "ITEM000005", name: "方便面", count: 3, unit: "袋", price: 4.5}]);

    const cartItems = buildCartItems(barcodeLists);


    expect(JSON.stringify(cartItems)).toBe(hoped_cart_items);
  });
});
