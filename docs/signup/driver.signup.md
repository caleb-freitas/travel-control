# Driver Signup API

## Success Case

- [x] Receives a POST request on the route `/api/driver/signup`

- [x] Validate the required fields: `name`, `email`, `password` and `passwordConfirmation`

- [x] Ensure that `password` and `passwordConfirmation` are equals

- [x] Validates if the `password` contains at least 8 characters including letters and numbers

- [x] Ensure that the `email` field is a valid email

- [x] Validates if already exists a driver with the provided `email` 

- [x] Validates if the provided `company_id` exist

- [x] Generates an encrypted password

- [x] Create an account for the driver with the entered data, replacing the password with the encrypted password

- [x] Should return **200** with the account data

## Exception Case

- [x] Should return **400** if the API does not exists

- [x] Should return **400** if `name`, `email`, `drivers_license`, `company_id`, `password` and `passwordConfirmation` are not provided

- [x] Should return **400** if `password` and `passwordConfirmation` are not equals

- [x] Should return **400** if the provided `password` does not meet the requirements

- [x] Should return **400** if the provided `email` is invalid

- [x] Should return **404** if the provided `company_id` does not exist

- [x] Should return **403** if the provided `email` is already in use

- [x] Should return **500** if there is an error when generating an encrypted password

- [x] Should return **500** if there is an error when creating a company account
