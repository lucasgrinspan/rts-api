import get, { generateUrl } from "./utils";

// Get information about the selected agency
export const getAgency = (agency = "") => {
    const url = generateUrl("agencies", agency);

    return get(url, "agency");
};

// Get information about all of the available bus routes
export const getRoutes = (agency = "") => {
    const url = generateUrl("routes", agency);

    return get(url, "routes");
};

// Get information about all of the segments that make the bus routes
export const getSegments = (agency = "") => {
    const url = generateUrl("segments", agency);

    return get(url, "segments");
};

// Get information about all of the available bus stops
export const getStops = (agency = "") => {
    const url = generateUrl("stops", agency);

    return get(url, "bus stop");
};

// Get information about the buses currently on the routes
export const getCurrentBuses = (agency = "") => {
    const url = generateUrl("vehicle_statuses", agency, { include_arrivals: "true" });

    return get(url, "agency");
};

// Get the current announcements
export const getAnnouncements = (agency = "") => {
    const url = generateUrl("announcements", agency);

    return get(url, "announcements");
};
