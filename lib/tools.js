"use strict";

exports.errors = function (errors) {
  var keys = Object.keys(errors)
  var errs = []

  if (!keys) {
    return ['Oops! There was an error: ' + errors]
  }

  keys.forEach(function (key) {
    if (errors[key]) errs.push(errors[key].message)
  })

  return errs
};
