const xApiKey = import.meta.env.VITE_QUICKR_X_API_KEY;

const defaultHeaders = {
    "User-Agent": "dintero-frontend-test",
    "Accept": "application/json"
}

export const checkAccountNumber = async (organizationNumber: string, accountNumber: string) => {
    const response = await fetch(`/quickr-api/search/bank-account/${organizationNumber}/${accountNumber}`, {
        headers: {
            ...defaultHeaders,
            "x-api-key": xApiKey
        },
    });
    const json = await response.json();
    return json?.data?.organizationOwnsAccount || false;
};
