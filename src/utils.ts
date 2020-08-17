const BASE_URL = "https://feeds.transloc.com/3/";

// Generate the base URL based on the location ID
const generateUrl = (resource: string, agency = "", opts = {}) => {
    const params = new URLSearchParams();

    if (agency) {
        params.append("agencies", agency);
    }

    // Typically, extra options is only used by vehicle_statuses
    // to include arrivals
    if (opts !== {}) {
        Object.entries(opts).forEach((entry) => {
            const key = entry[0];
            const value = entry[1].toString();

            params.append(key, value);
        });
    }

    return `${BASE_URL}${resource}?${params.toString()}`;
};

const get = async (url: string, resource: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching ${resource} data from RTS. url: ${url}`);
    }

    const jsonData = await response.json();

    // Each RTS response has a boolean field indicating whether the server
    // can successfully respond
    if (!jsonData.success) {
        const errorMessage: string = jsonData.message;
        throw new Error(
            `Error from RTS server while fetching ${resource}. Message: ${errorMessage}. url: ${url}`
        );
    }

    return jsonData;
};

export { get as default, generateUrl };
