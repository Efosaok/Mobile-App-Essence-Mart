import currenciesList from "./currencies-list";

export const queryCurrenciesByNaira = (fromCurrency) => {
  const to = 'NGN'
  const from = Object.keys(currenciesList);
  // USD_NGN,EUR_NGN,...AFK - would have to add 'NGN,' to the end of the string
  let fromTo = from.map(eachFrom => `${eachFrom}_${to}`);
  fromTo = fromTo.join(',');
  if (fromTo) return fromTo;
  return `${fromCurrency}_${to}`
}

export const currencies = {
  EUR: 456.25,
  USD: 391
}
