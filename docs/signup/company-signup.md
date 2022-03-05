# Signup API

## Success Case

- [ ] Receives a POST request on the route `/api/company/signup`

- [ ] Validate the required fields: `name`, `email`, `country`, `cnpj`, `password` and `passwordConfirmation`

- [ ] Validates if the password contains at least 8 characters including letters and numbers

- [ ] Ensure that `password` and `passwordConfirmation` are equals

- [ ] Ensure that the `email` field is a valid email

- [ ] Ensure that the `cnpj` field is a valid cnpj

- [ ] Validates if already exists a company with the provided `email` 

- [ ] Validates if already exists a company with the provided `cnpj`

- [ ] Generates an encrypted password

- [ ] Create an account for the company with the entered data, replacing the password with the encrypted password

- [ ] Generates an access token from the company id

- [ ] Updates the company data with the generated access token

- [ ] Should return **200** with the access token

## Exception Case

- [ ] Should return **400** if the API does not exists

- [ ] Should return **400** if `name`, `email`, `password` or `passwordConfirmation` are not provided

- [ ] Should return **400** if password and `passwordConfirmation` are not the same

- [ ] Should return **400** if the provided `password` does not meet the requirements

- [ ] Should return **400** if the provided `email` are invalid

- [ ] Should return **400** if the provided `cnpj` are invalid

- [ ] Should return **403** if the provided `email` are already in use

- [ ] Should return **403** if the provided `cnpj` are already in use

- [ ] Should return **500** if there is an error when generating an encrypted password

- [ ] Should return **500** if there is an error when creating a company account

- [ ] Should return **500** if there is an error when generating access token

- [ ] Should return **500** if there is an error when updating company's access token
