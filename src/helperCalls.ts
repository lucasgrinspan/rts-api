import { Stop, Route, Bus, Segment } from "./types";
import { getStops, getRoutes, getSegments } from "./apiCalls";

// These functions add some utility to the base RTS API

// Returns the stop object for the specified ID
export const getStopById = async (agencyID: string, stopID: string): Promise<Stop> => {
    const stops = await getStops(agencyID);

    return stops.find((stop) => stop.id === stopID);
};

// Returns the route object for the specified ID
export const getRouteById = async (agencyID: string, routeID: string): Promise<Route> => {
    const routes = await getRoutes(agencyID);

    return routes.find((route) => route.id === routeID);
};

// Returns all of the segments on a route
export const getSegmentsOnRoute = async (
    agencyID: string,
    routeID: string,
    segments: Segment[]
): Promise<Segment[]> => {
    const route = await getRouteById(agencyID, routeID);

    return segments.filter((segment) => {
        route.segments.includes(segment.id);
    });
};
