const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function  validateProfileInput(data) {
  console.log("carajos", data);
  let errors = {}


  data.status = !isEmpty(data.status) ? data.status: ''
  data.street = !isEmpty(data.street) ? data.street: ''
  data.city = !isEmpty(data.city) ? data.city: ''
  data.state = !isEmpty(data.state) ? data.state: ''
  data.zip = !isEmpty(data.zip) ? data.zip: ''

  if(Validator.isEmpty(data.status)){
    errors.status = "Status field is required "
  }
  // if(Validator.isEmpty(data.address)){
  //   errors.address = "Address field is required "
  // }

  if(Validator.isEmpty(data.street)){
    errors.street = "Street field is required "
  }
  if(Validator.isEmpty(data.city)){
    errors.city = "City field is required "
  }
  if(Validator.isEmpty(data.state)){
    errors.state = "State field is required "
  }
  //
  if(Validator.isEmpty(data.zip)){
      errors.zip = "Zip field is required "
  }


  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
      errors.youtube = "Not a valid URL "
    }
  }
  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
      errors.twitter = "Not a valid URL "
    }
  }
  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
      errors.facebook = "Not a valid URL "
    }
  }
  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)){
      errors.instagram = "Not a valid URL "
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
