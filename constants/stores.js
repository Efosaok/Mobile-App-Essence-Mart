export default [
    {
      title: 'Amazon UK',
      caption: 'AMAZON UK',
      link: 'https://www.amazon.co.uk',
      cartLink: 'https://www.amazon.co.uk/gp/cart/view.html?ref_=nav_cart',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: '.sc-product-title', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '.sc-product-price',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: '.sc-update-quantity-input',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: '.sc-product-image',
    },
    {
      title: 'Amazon USA',
      caption: 'AMAZON',
      link: 'https://www.amazon.com',
      cartLink: 'https://www.amazon.com/gp/cart/view.html?ref_=nav_cart',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: '.sc-product-title', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '.sc-product-price',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: '.sc-update-quantity-input',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: '.sc-product-image',
    },
    {
      title: 'argos',
      caption: 'Argos',
      link: 'https://www.argos.co.uk',
      cartLink: 'https://www.argos.co.uk/basket?clickOrigin=header:trolley:trolley',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: '[data-e2e="product-name"] span', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '[data-e2e="product-line-price"]',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: '[data-e2e="product-quantity"]',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: 'img[data-test="product-image"]',
    },
    {
      title: 'Bath & Body Works',
      caption: 'Bath & Body Works',
      link: 'https://www.bathandbodyworks.com',
      cartLink: 'https://www.bathandbodyworks.com/cart',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: '.product-list-item .name', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '.item-price',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: '[name="visibleQty"]',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: '.item-image img',
    },
    {
      title: 'bebe',
      caption: 'bebe',
      link: 'https://www.bebe.com',
      cartLink: 'https://www.bebe.com/cart',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: 'h4.cart-title', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '.cart-section .prod-price span',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: '.cart-section .cart-qty',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: '.cart-section .cart-image img',
      itemSizePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemSizeElementClass: '.cart-props dd:first-child',
      itemColorPath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemColorElementClass: '.cart-props dd:last-child',
    },
    {
      title: 'besthairbuy',
      caption: 'Best Hair Buy',
      link: 'https://www.besthairbuy.com',
      cartLink: 'https://www.besthairbuy.com/checkout/cart',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: 'h2.product-name', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '#shopping-cart-table td >.price',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: 'td [title="Qty"]',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: '#shopping-cart-table>td >img',
      itemSizePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemSizeElementClass: '.cart-props dd:first-child',
      itemColorPath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemColorElementClass: '.cart-props dd:last-child',
    },
    {
      title: 'Bloomingdales',
      caption: 'Bloomingdale\'s',
      link: 'https://www.bloomingdales.com',
      cartLink: 'https://www.bloomingdales.com/my-bag',
      linkRef: 'ref_=navm_hdr_cart',
      itemDescriptionPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[1]/div/div/div[2]/ul/li[1]/span/a/span[1]/span/span[1]',
      itemDescriptionElementName: '.bag-product-description', // '.a-truncate-full',
      itemPriceElementPath: '//*[@id="sc-item-C4eeca355-73db-4dae-b621-d5bf8e016b46"]/div[4]/div/div[2]/p/span',
      itemPriceElementClass: '.ITEM_TOTAL',
      itemQuantityElementPath: '//*[@id="a-autoid-0-announce"]/span[2]',
      itemQuantityElementClass: '.bag-item-dd',
      itemImagePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemImageElementClass: '.bag-item-container picture>img',
      itemSizePath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemSizeElementClass: '.cart-props dd:first-child',
      itemColorPath: '//*[@id="sc-item-Ccc8f77b1-7329-46ea-81ff-47d49d043696"]/div[4]/div/div[1]/div/div/div[1]/a/img',
      itemColorElementClass: '.cart-props dd:last-child',
    },
    {
      title: 'Blue Fly',
      caption: 'Blue Fly',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Boscovs',
      caption: 'Boscov\'s',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
    {
      title: 'Amazon UK',
      caption: 'Amazon UK',
      link: 'https://www.amazon.com'
    },
  ];
  