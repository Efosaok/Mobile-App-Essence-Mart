import currencies_list from "./currencies-list";

export const queryCurrenciesByNaira = (from_currency) => {
  const to = 'NGN'
  const from = Object.keys(currencies_list);
  // USD_NGN,EUR_NGN,...AFK - would have to add 'NGN,' to the end of the string
  let from_to = from.map(fromCurrency => `${fromCurrency}_${to}`);
  from_to = from_to.join(',');
  if (from_to) return from_to;
  return `${from_currency}_${to}`
}

export const currencies = {
  EUR: 456.25,
  USD: 391
}
