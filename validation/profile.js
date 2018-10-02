const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function  validateProfileInput(data) {
  let errors = {}

  data.address = !isEmpty(data.address) ? data.address: ''
  data.status = !isEmpty(data.status) ? data.status: ''

  if(Validator.isEmpty(data.address)){
    errors.address = "Address field is required "
  }
  if(Validator.isEmpty(data.status)){
    errors.status = "Status field is required "
  }


  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
