# Signup API

## Success Case

- [x] Receives a POST request on the route `/api/company/signup`

- [x] Validate the required fields: `name`, `email`, `cnpj`, `password` and `passwordConfirmation`

- [x] Ensure that `password` and `passwordConfirmation` are equals

- [x] Validates if the `password` contains at least 8 characters including letters and numbers

- [x] Ensure that the `email` field is a valid email

- [x] Ensure that the `cnpj` field is a valid cnpj

- [x] Validates if already exists a company with the provided `email` 

- [x] Validates if already exists a company with the provided `cnpj`

- [x] Generates an encrypted password

- [x] Create an account for the company with the entered data, replacing the password with the encrypted password

- [x] Should return **200** with the account data

## Exception Case

- [x] Should return **400** if the API does not exists

- [x] Should return **400** if `name`, `email`, `cnpj`, `password` and `passwordConfirmation` are not provided

- [x] Should return **400** if `password` and `passwordConfirmation` are not equals

- [x] Should return **400** if the provided `password` does not meet the requirements

- [x] Should return **400** if the provided `email` are invalid

- [x] Should return **400** if the provided `cnpj` are invalid

- [x] Should return **403** if the provided `email` are already in use

- [x] Should return **403** if the provided `cnpj` are already in use

- [x] Should return **500** if there is an error when generating an encrypted password

- [x] Should return **500** if there is an error when creating a company account
