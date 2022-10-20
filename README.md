# Dintero frontend task

Please submit your answer as a git project containing the .git folder, or just publish the repo on your own or a throwaway github account.

## Task description

Create a small SPA that contains 2 views, one for searching for companies and the second one for verifying that a bank account number belongs to a company.

### View 1: Company search

This view will allow the user to search for an organization and select one of the hits from the search.

Use this API endpoint for search for companies:
GET `http://localhost:5173/dintero-api/organizations/?name={organization_name}`

Responses looks like this:
```
[
    {
        "response_from": "enhetsregisteret",
        "organization_number": "919656395",
        "organization_type": "AS",
        "business_name": "DINTERO AS",
        "website_url": "www.dintero.com",
        "business_address": {
            "address_line": "Sandakerveien 138",
            "address_line_2": "",
            "postal_code": "0484",
            "postal_place": "OSLO",
            "country": "NO"
        }
    }
]
```


Example UX: https://www.figma.com/file/L7XqEsygJ1ZvABFR16LXLK/Untitled?node-id=7%3A111

### View 2: Verify ownership of bank account number

This view will allow the end user to input a bank account number and then verify if the bank account number belongs to the company selected in view 1. If the bank account number is not correctly formatted we should show a validation error to the end user.

Use the `checkAccountNumber(organizationNumber, accountNumber)` function exported from  `src/quickr.ts` to check if the company owns the account number or not.

This function works by using the [KAR](https://www.dnb.no/bedrift/dagligbank/betaling/kar) registry endpoint of _quickr.com_ (quickr is a service built by Dintero) to check if the bank account number is owned by the organization.

Example valid data for testing:
- org no `919656395`
- account number `15039560353`.

Example UX: https://www.figma.com/file/L7XqEsygJ1ZvABFR16LXLK/Untitled?node-id=7%3A1117

## Files in this folder

This folder contains a Typescript app using vite. Use this as a starting point for your application.

Configure the `VITE_QUICKR_X_API_KEY` environment variables in the `.env` file. Make sure to not check in changes to the `.env` file to git, it should be blocked in the .gitignore file.

Start the application in development mode with `yarn dev`.
