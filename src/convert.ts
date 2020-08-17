import { Agency, Route, Segment, Stop } from "./types";

// This file converts JSON from the server to objects

// Data keys to extract the information from the json data from the server
const DATA_KEYS = {
    agencies: "agencies",
    routes: "routes",
    segments: "segments",
    stops: "stops",
};

export const getAgenciesFromData = (data: any): Agency[] => {
    const agenciesData: any[] = data[DATA_KEYS.agencies];

    const agencies: Agency[] = agenciesData.map((agencyData) => {
        const agency: Agency = {
            affiliatedAgencies: agencyData.affiliated_agencies,
            arrivalPredictions: agencyData.arrival_predictions,
            bounds: agencyData.bounds,
            color: agencyData.color,
            hasNotifications: agencyData.has_notifications,
            hasSchedules: agencyData.has_schedules,
            hasTripPlanning: agencyData.has_trip_planning,
            id: agencyData.id.toString(),
            location: agencyData.location,
            longName: agencyData.long_name,
            name: agencyData.name,
            position: agencyData.position,
            shortName: agencyData.short_name,
            textColor: agencyData.text_color,
            timezone: agencyData.timezone,
            timezoneOffset: agencyData.timezone_offset,
            url: agencyData.url || "",
        };

        return agency;
    });

    return agencies;
};

export const getRoutesFromData = (data: any): Route[] => {
    const routesData: any[] = data[DATA_KEYS.routes];

    const routes: Route[] = routesData.map((routeData) => {
        const route: Route = {
            agencyID: routeData.agency_id.toString(),
            bounds: routeData.bounds,
            color: routeData.color,
            description: routeData.description,
            id: routeData.id.toString(),
            isActive: routeData.is_active,
            longName: routeData.long_name,
            segments: routeData.segments.map((x: number) => x.toString()),
            shortName: routeData.short_name,
            textColor: routeData.text_color,
            type: routeData.type,
            url: routeData.url,
        };

        return route;
    });

    return routes;
};

export const getSegmentsFromData = (data: any): Map<string, Segment> => {
    const segmentsData: any[] = data[DATA_KEYS.segments];

    const segments: Map<string, Segment> = new Map(
        segmentsData.map((segmentData) => {
            const segment: Segment = {
                levels: segmentData.levels,
                points: segmentData.points,
            };

            return [segmentData.id.toString(), segment];
        })
    );

    return segments;
};

export const getStopsFromData = (data: any): Stop[] => {
    const stopsData: any[] = data[DATA_KEYS.stops];

    const stops: Stop[] = stopsData.map((stopsData) => {
        const stop: Stop = {
            code: stopsData.code,
            description: stopsData.description,
            id: stopsData.id,
            locationType: stopsData.location_type,
            name: stopsData.name,
            parentStationID: stopsData.parentStationID ? stopsData.parentStationID.toString() : "",
            position: stopsData.position,
            url: stopsData.url,
        };

        return stop;
    });

    return stops;
};
