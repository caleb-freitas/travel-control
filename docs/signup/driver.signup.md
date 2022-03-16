# Driver Signup API

## Success Case

- [ ] Receives a POST request on the route `/api/driver/signup`

- [ ] Validate the required fields: `name`, `email`, `password` and `passwordConfirmation`

- [ ] Ensure that `password` and `passwordConfirmation` are equals

- [ ] Validates if the `password` contains at least 8 characters including letters and numbers

- [ ] Ensure that the `email` field is a valid email

- [ ] Validates if already exists a driver with the provided `email` 

- [ ] Generates an encrypted password

- [ ] Create an account for the driver with the entered data, replacing the password with the encrypted password

- [ ] Should return **200** with the account data

## Exception Case

- [ ] Should return **400** if the API does not exists

- [ ] Should return **400** if `name`, `email`, `driversLicense`, `company_id`, `password` and `passwordConfirmation` are not provided

- [ ] Should return **400** if `password` and `passwordConfirmation` are not equals

- [ ] Should return **400** if the provided `password` does not meet the requirements

- [ ] Should return **400** if the provided `email` is invalid

- [ ] Should return **400** if the provided `company_id` is invalid

- [ ] Should return **403** if the provided `email` is already in use

- [ ] Should return **500** if there is an error when generating an encrypted password

- [ ] Should return **500** if there is an error when creating a company account
