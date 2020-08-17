import get, { generateUrl } from "./utils";
import { getAgenciesFromData, getRoutesFromData } from "./convert";
import { Agency, Route } from "./types";

// This file defines all of the possible endpoints that you can call

// Get information about all of the agencies
export const getAgencies = async (): Promise<Agency[]> => {
    const url = generateUrl("agencies");

    const data = await get(url, "agency");

    const agencies = getAgenciesFromData(data);

    return agencies;
};

// Get information about the selected agency
export const getAgency = async (agency: string): Promise<Agency> => {
    const url = generateUrl("agencies", agency);

    const data = await get(url, "agency");

    const agencies = getAgenciesFromData(data);

    return agencies[0];
};

// Get information about all of the available bus routes
export const getRoutes = async (agency: string): Promise<Route[]> => {
    const url = generateUrl("routes", agency);

    const data = await get(url, "routes");

    const routes = getRoutesFromData(data);

    return routes;
};

// Get information about all of the segments that make the bus routes
export const getSegments = (agency: string) => {
    const url = generateUrl("segments", agency);

    return get(url, "segments");
};

// Get information about all of the available bus stops
export const getStops = (agency: string) => {
    const url = generateUrl("stops", agency);

    return get(url, "bus stop");
};

// Get information about the buses currently on the routes
export const getCurrentBuses = (agency: string) => {
    const url = generateUrl("vehicle_statuses", agency, { include_arrivals: "true" });

    return get(url, "agency");
};

// Get the current announcements
export const getAnnouncements = (agency: string) => {
    const url = generateUrl("announcements", agency);

    return get(url, "announcements");
};