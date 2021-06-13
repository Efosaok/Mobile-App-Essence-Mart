const conditions = {
  equals: (condition, index) => condition &&
    condition.item &&
    condition.key &&
    condition.item[index][condition.key] === condition.identity,
  hasCondition: (condition, index) => condition &&
  condition.item &&
  condition.key &&
  condition.item[index][condition.key] === condition.identity,
}

/**
 * @abstract We are basically dispensing the condition from one source and parsing this
 * object as parameter, the result should be like 
 * @example if (items[index][key] === identity)
 * @summary this index would be provided by the Loop function
 * @param {*} identity
 * @returns void
 */
export const condition = (items, key, type, identity) => ({
    type: type || 'equals',
    key: key || 'uid',
    identity,
    items
  })

export const SyntacticLoop = (myArray, useCondition, callback) => {
  let items; let dCondition;

  if (!Array.isArray(myArray) && myArray.items) items = myArray.items
  if (!Array.isArray(myArray) && myArray.type) dCondition = myArray
  if (typeof useCondition !== 'function') dCondition = useCondition

  let i = 0; const len = (myArray || items).length;
  const runCondition = conditions[`${dCondition.type}`]
  while (i < len) {
    // your code
    if (dCondition && runCondition && runCondition(dCondition, i)) return callback(i)
    callback(i)
    // eslint-disable-next-line no-plusplus
    i++
  }
}

export default SyntacticLoop
