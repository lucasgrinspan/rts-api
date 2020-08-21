import get, { generateUrl } from "./utils";
import {
    getAgenciesFromData,
    getRoutesFromData,
    getSegmentsFromData,
    getStopsFromData,
    getBusesFromData,
    getAnnouncementsFromData,
} from "./convert";
import { Agency, Route, Segment } from "./types";
import { getSegmentsOnRoute } from "./helperCalls";

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
    const url = generateUrl("routes", agency, { include_segments: "true", include_stops: "true" });

    const data = await get(url, "routes");

    const routes = getRoutesFromData(data);

    return routes;
};

// Get information about all of the segments that make the bus routes
export const getSegments = async (agency: string, routeID = "") => {
    const url = generateUrl("segments", agency);

    const data = await get(url, "segments");

    let segments = getSegmentsFromData(data);

    if (routeID) {
        segments = await getSegmentsOnRoute(agency, routeID, segments);
    }

    return segments;
};

// Get information about all of the available bus stops
export const getStops = async (agency: string, routeID = "") => {
    let specificRoute: any = {};

    if (routeID) {
        specificRoute["routes"] = routeID;
    }

    const url = generateUrl("stops", agency, specificRoute);

    const data = await get(url, "stops");

    const stops = getStopsFromData(data);

    return stops;
};

// Get information about the buses currently on the routes
export const getCurrentBuses = async (agency: string, routeID = "") => {
    let specificRoute: any = {};

    if (routeID) {
        specificRoute["routes"] = routeID;
    }

    const url = generateUrl("vehicle_statuses", agency, specificRoute);

    const data = await get(url, "buses");

    const stops = getBusesFromData(data);

    return stops;
};

// Get the current announcements
export const getAnnouncements = async (agency: string) => {
    const url = generateUrl("announcements", agency, { contents: "true" });

    const data = await get(url, "announcements");

    const announcements = getAnnouncementsFromData(data);

    return announcements;
};
