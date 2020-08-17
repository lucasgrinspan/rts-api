import get, { generateUrl } from "./utils";

// Get information about the selected agency
export const getAgency = () => {
    const url = generateUrl("agencies", "116");

    return get(url, "agency");
};

// Get information about all of the available bus routes
export const getRoutes = () => {
    const url = generateUrl("routes", "116");

    return get(url, "routes");
};

// Get information about all of the segments that make the bus routes
export const getSegments = () => {
    const url = generateUrl("segments", "116");

    return get(url, "segments");
};

// Get information about all of the available bus stops
export const getStops = () => {
    const url = generateUrl("stops", "116");

    return get(url, "bus stop");
};

// Get information about the buses currently on the routes
export const getCurrentBuses = () => {
    const url = generateUrl("vehicle_statuses", "116", { include_arrivals: "true" });

    return get(url, "agency");
};

// Get the current announcements
export const getAnnouncements = () => {
    const url = generateUrl("announcements", "116");

    return get(url, "announcements");
};
