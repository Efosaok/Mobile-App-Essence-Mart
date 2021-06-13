export const script = (store, simulateClick) => `!(function($) {
  var $$ = function (selector, parent) {
    return Array.prototype.slice.call((parent ? parent : window.document || document).querySelectorAll(selector));
  };

  // if start with '//' instead of 'https://'
  var $urlPattern = new RegExp('^' + '//', 'i');
  const matchUrl = (value, vm) => {
    return $urlPattern.test(value)
  }

  // get item currency
  const getCurrency = (price, setDefault) => {
    if (price.includes('$')) return '$';
    if (price.includes('£')) return '£';
    if (price.includes('₦')) return '₦';
    if (price.includes('USD')) return 'USD'
    if (price.includes('NGN')) return 'NGN'
    if (price.includes('EUR')) return 'EUR'
    // default
    if(setDefault) return '₦';
  }

  var sanitizeQuery = function (elem, attr) {
    switch (attr) {
      case 'src':
        var src = (elem && elem.src) || '';
        var srcset = src || matchUrl(src) ? '' : (elem && elem.srcset) || '';
        var content = (elem && (srcset.split(', ')[0] || elem.value || elem.content))
        content = content && content.replace('//media', 'https://media')
        // return src.includes('data:image/svg;base64') ? content : src;
        src = content || src;
        return matchUrl(src) ? src.replace('//', 'https://') : src;

      default:
        return (elem && elem[attr]);
    }
  }

  var Quantity = (index) => {
    var quantity = getUniqueItem($$('${store.itemQuantityElementClass}')[index || 0], 'value');
    quantity = (quantity && quantity.replace('Qty:', '') || '')
    quantity = (quantity && quantity.replace('Quantity: ', '') || '')
    return Number(quantity || 1)
  }

  var Price = (data, type, index) => {
    let price = data && data.replace(' each', '');
    price = (price && price.split(',').join('')) || price;
    price = (price && price.split('Now ')[1]) || price;
    price = (price && price.split('Item Price').join('')) || price;
    price = (price && price.split(':').join('')) || price

    // Get Exact currency
    var currency = getCurrency(price);
    var newPrice = currency ? price.split(currency)[1] : (price || 0);

    switch (type) {
      case 'AUTOZONE': {
        // Price in string reverse from 10050 -> 05001, 
        // so as to remove the 50kobo and actual price be 100
        let price_in_string_rvs = String(newPrice).split('').reverse().join('');
        const kobo_to_remove = getUniqueItem($$('${store.itemSplitPriceElementClass}')[index || 0], 'textContent');
        if (kobo_to_remove) {
          let kobo_in_rvs = kobo_to_remove.split('').reverse().join('');

          price_in_string_rvs = price_in_string_rvs.replace(kobo_in_rvs, '');
          price_in_string_rvs = price_in_string_rvs.split('').reverse().join('');
          kobo_in_rvs = kobo_in_rvs.split('').reverse().join('');
          return price_in_string_rvs + '.' + kobo_in_rvs;
        }

        return newPrice;
      }

      default:
        return newPrice;
    }
  }

  var splitPriceByQuantity = function (type, index) {
    switch (type) {
      case 'EVERYTHING 5 POUNDS':
      case 'AUTOZONE':
      case 'CARID':
      case 'HP':
      case 'ALL BEAUTY':
      case 'HAWES & CURTIS':
      case '6PM':
      case 'FIGLEAVES':
      case 'WOLF & BADGER':
      case 'EVANS':
      case 'ZAPPOS':
      case 'YANKEE CANDLES':
      // case "VICTORIA'S SECRET":
      case 'TILLYS':
      case 'MARKS & SPENCER':
      case 'KOHLS':
      case 'CLOTHING UNDER 10':
      case 'BARE NECESSITIES':
        return Quantity(index);

      default:
        return null;
    }
  }

  var sanitizeData = function (data, type, index) {
    switch (type) {
      case 'PRICE': {
        var newPrice = Price(data, '${store.title}', index);

        var quantity = splitPriceByQuantity('${store.title}', index);
        return (quantity && quantity > 1) ? String(newPrice / quantity) : newPrice;
      }

      case 'CURRENCY': {
        let price = data && data.replace(' each', '');
        price = price && price.split(',').join('') || price;
        price = (price && price.split('Now ')[1]) || price;
        price = (price && price.split('Item Price').join('')) || price;
        price = (price && price.split(':').join('')) || price
        return getCurrency(price, true);
      }

      case 'QUANTITY': {
        data = (data && data.replace('Qty:', '') || data)
        return ((data && data.replace('Quantity:', '') || data) || '').trim()
      }

      default:
        return data;
    }
  }

  var getUniqueItem = function (elem, attr, type, index) {
    let data = '';
    if (type == 'INFO') {
      const INFOs = [];
      for (var y in elem) {
        data = sanitizeQuery(elem[y], attr) || sanitizeQuery(elem[y], 'src') || (elem[y] && elem[y].value);
        INFOs.push(data);
      }
      data = INFOs;
    } else if (elem && elem.length > 1) {
      data = sanitizeQuery(elem[0], attr) || sanitizeQuery(elem[0], 'src') || (elem[0] && elem[0].value) || (elem && elem[0].textContent);
    } else {
      data = sanitizeQuery(elem, attr) || sanitizeQuery(elem, 'src') || (elem && elem.value) || (elem && elem.textContent);
    }

    return sanitizeData(data, type, index);
  };

  var getIdentifier = function () {
    switch ('${store.title}') {
      case 'WALMART':
        window.console.log('WALMART')
        return '${store.itemDescriptionElementName}';

      default:
        return '${store.itemPriceElementClass}';
    }
  }

  const globalWindow = window;
  try {
    var addToCart = function () {
      var carts = [];
      for ( var i in $$(getIdentifier()) ) {
        carts.push({
          description: getUniqueItem($$('${store.itemDescriptionElementName}')[i], 'textContent'),
          brand: getUniqueItem($$('${store.itemBrandElementName}')[i], 'textContent'),
          price: getUniqueItem($$('${store.itemPriceElementClass}')[i], 'innerText', 'PRICE', i),
          currency: getUniqueItem($$('${store.itemPriceElementClass}')[i], 'textContent', 'CURRENCY'),
          imageUrl: getUniqueItem($$('${store.itemImageElementClass}')[i], 'src'),
          quantity: getUniqueItem($$('${store.itemQuantityElementClass}')[i], 'value', 'QUANTITY'),
          link: getUniqueItem($$('${store.itemLinkElementClass}')[i], 'href'),
          color: getUniqueItem($$('${store.itemColorElementClass}')[i], 'innerText'),
          width: getUniqueItem($$('${store.itemWidthElementClass}')[i], 'innerText'),
          size: getUniqueItem($$('${store.itemSizeElementClass}')[i], 'innerText'),
          colarSize: getUniqueItem($$('${store.itemColarSizeElementClass}')[i], 'innerText'),
          sleeveLength: getUniqueItem($$('${store.itemSleeveLengthElementClass}')[i], 'innerText'),
          chestSize: getUniqueItem($$('${store.itemChestSizeElementClass}')[i], 'innerText'),
          waistElement: getUniqueItem($$('${store.itemWaistElementClass}')[i], 'innerText'),
          varaint: getUniqueItem($$('${store.itemVaraintElementClass}')[i], 'textContent'),
          info: getUniqueItem($$('${store.itemInfoElementClass}')[i], 'textContent', 'INFO'),
        });
      }

      globalWindow.ReactNativeWebView.postMessage(JSON.stringify({ carts }))
      true
    }

    document.addEventListener("message", function (event) {
      addToCart();
    });

    window.addEventListener("message", function () {
      addToCart();
    });

    // simulate Click event on checkout button
    // var isClicked = false;
    // if ('${simulateClick}' !== '') {
    //   var elem = $$('${store.cartElementClass}')[0];
    //   elem.addEventListener("click", function() {
    //     window.alert('click --- click')
    //     addToCart();
    //     isClicked = true
    //     // window.postMessage(JSON.stringify({carts}),"*");
    //   }, false);
    //   if (!isClicked) elem.click();
    // }

    // addToCart();

    true
  } catch (error) {
    var err = (error && error.message) || error;
    err = JSON.stringify(err);
    globalWindow.ReactNativeWebView.postMessage({ error: err });
  }
  true
})();
`

export default script;
