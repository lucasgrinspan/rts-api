const BASE_URL = "https://feeds.transloc.com/3/";

// Generate the base URL based on the location ID
const generateUrl = (resource: string, agency: string, opts = {}) => {
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

const get = (url: string, resource: string) => {
    return fetch(url).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error(`Error fetching ${resource} data from RTS`);
    });
};

export { get as default, generateUrl };
