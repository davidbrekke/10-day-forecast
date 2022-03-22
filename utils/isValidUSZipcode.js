const isValidUSZipcode = (zipcode) => {
  return /^\d{5}(-\d{4})?$/.test(zipcode)
}

export { isValidUSZipcode }
