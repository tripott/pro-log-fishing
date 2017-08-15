const { toLower, concat, trim, compose, replace } = require('ramda')

module.exports = (prefix, value) => {
  //prefix :  "cat_"
  //value: "Big Time owner 33"
  // returns: "cat_big_time_owner_333"

  return compose(concat(prefix), replace(/ /g, '_'), trim, toLower)(value)
}
