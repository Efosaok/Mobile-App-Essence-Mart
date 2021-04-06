export const script = (store) => `!(function($) {
  var $$ = function (selector, parent) {
    return Array.prototype.slice.call((parent ? parent : document).querySelectorAll(selector));
  };

  var item = function (elem, val) {
    if (elem && elem.length > 1) {
      return (elem[0] && elem[0][val]) || (elem[0] && elem[0].src)
    }
    return (elem && elem[val]) || (elem && elem.src)
  };

  document.addEventListener("message", function () {
    var carts = []
    for ( var i in $$('${store.itemPriceElementClass}') ) {
      carts.push({
        description: item($$('${store.itemDescriptionElementName}')[i], 'textContent'),
        price: item($$('${store.itemPriceElementClass}')[i], 'textContent'),
        imageUrl: item($$('${store.itemImageElementClass}')[i], 'src'),
        quantity: item($$('${store.itemQuantityElementClass}')[i], 'value'),
      });
    }
  
    window.ReactNativeWebView.postMessage(JSON.stringify({ carts }))
  });

  var carts = []
  for ( var i in $$('${store.itemPriceElementClass}') ) {
    carts.push({
      description: item($$('${store.itemDescriptionElementName}')[i], 'textContent'),
      price: item($$('${store.itemPriceElementClass}')[i], 'textContent'),
      imageUrl: item($$('${store.itemImageElementClass}')[i], 'src'),
      quantity: item($$('${store.itemQuantityElementClass}')[i], 'value'),
    });
  }

  window.ReactNativeWebView.postMessage(JSON.stringify({ carts }))
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
