import get, { generateUrl } from "./utils";
import {
    getAgenciesFromData,
    getRoutesFromData,
    getSegmentsFromData,
    getStopsFromData,
    getBusesFromData,
} from "./convert";
import { Agency, Route, Segment } from "./types";

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
    const url = generateUrl("routes", agency, { include_segments: "true" });

    const data = await get(url, "routes");

    const routes = getRoutesFromData(data);

    return routes;
};

// Get information about all of the segments that make the bus routes
export const getSegments = async (agency: string) => {
    const url = generateUrl("segments", agency);

    const data = await get(url, "segments");

    const segments = getSegmentsFromData(data);

    return segments;
};

// Get information about all of the available bus stops
export const getStops = async (agency: string) => {
    const url = generateUrl("stops", agency);

    const data = await get(url, "stops");

    const stops = getStopsFromData(data);

    return stops;
};

// Get information about the buses currently on the routes
export const getCurrentBuses = async (agency: string) => {
    const url = generateUrl("vehicle_statuses", agency);

    const data = await get(url, "buses");

    const stops = getBusesFromData(data);

    return stops;
};

// Get the current announcements
export const getAnnouncements = (agency: string) => {
    const url = generateUrl("announcements", agency);

    return get(url, "announcements");
};
