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
    if (price.includes('EUR')) return 'EUR'
    // default
    if(setDefault) return '₦';
  }

  var sanitizeQuery = function (elem, attr) {
    switch (attr) {
      case 'src':
        var src = (elem && elem.src) || '';
        var content = (elem && (elem.value || elem.content))
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
    return Number(quantity || 1)
  }

  var Price = (data, type, index) => {
    let price = data && data.replace(' each', '');
    price = price && price.split(',').join('') || price;

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
        return Quantity(index);

      default:
        return null;
    }
  }

  var sanitizeData = function (data, type, index) {
    switch (type) {
      case 'PRICE': {
        // let price = data && data.replace(' each', '');
        // price = price && price.split(',').join('') || price;
        // var currency = getCurrency(price);
        // var newPrice = currency ? price.split(currency)[1] : (price || 0);
        var newPrice = Price(data, '${store.title}', index);

        // divide price by quantity if store was Everything five pounds
        // var isEverythin5Pounds = '${store.title}' === 'EVERYTHING 5 POUNDS';
        var quantity = splitPriceByQuantity('${store.title}', index);
        return (quantity && quantity > 1) ? String(newPrice / quantity) : newPrice;
      }

      case 'CURRENCY': {
        let price = data && data.replace(' each', '');
        price = price && price.split(',').join('') || price;
        return getCurrency(price, true);
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
      data = sanitizeQuery(elem[0], attr) || sanitizeQuery(elem[0], 'src') || (elem[0] && elem[0].value);
    } else {
      data = sanitizeQuery(elem, attr) || sanitizeQuery(elem, 'src') || (elem && elem.value);
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
          price: getUniqueItem($$('${store.itemPriceElementClass}')[i], 'textContent', 'PRICE', i),
          currency: getUniqueItem($$('${store.itemPriceElementClass}')[i], 'textContent', 'CURRENCY'),
          imageUrl: getUniqueItem($$('${store.itemImageElementClass}')[i], 'src'),
          quantity: getUniqueItem($$('${store.itemQuantityElementClass}')[i], 'value'),
          link: getUniqueItem($$('${store.itemLinkElementClass}')[i], 'href'),
          color: getUniqueItem($$('${store.itemColorElementClass}')[i], 'innerText'),
          width: getUniqueItem($$('${store.itemWidthElementClass}')[i], 'innerText'),
          size: getUniqueItem($$('${store.itemSizeElementClass}')[i], 'innerText'),
          colarSize: getUniqueItem($$('${store.itemColarSizeElementClass}')[i], 'innerText'),
          sleeveLength: getUniqueItem($$('${store.itemSleeveLengthElementClass}')[i], 'innerText'),
          chestSize: getUniqueItem($$('${store.itemChestSizeElementClass}')[i], 'innerText'),
          waistElement: getUniqueItem($$('${store.itemWaistElementClass}')[i], 'innerText'),
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

    addToCart();

    true
  } catch (error) {
    var err = (error && error.message) || error;
    err = JSON.stringify(err);
    globalWindow.ReactNativeWebView.postMessage({ error: err });
  }
  true
})(${require('../shared/jquery')});
`

// return Alert.alert(
//   'External URL',
//   'Do you want to open this URL in your browser?',
//   [
//     {text: 'Cancel', style: 'cancel'},
//     {text: 'OK', onPress: () => Linking.openURL( data.external_url_open )},
//   ],
//   { cancelable: false }
// );
