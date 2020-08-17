import { Agency, Route } from "./types";

// This file converts JSON from the server to objects

// Data keys to extract the information from the json data from the server
const DATA_KEYS = {
    agencies: "agencies",
    routes: "routes",
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
            shortName: routeData.short_name,
            textColor: routeData.text_color,
            type: routeData.type,
            url: routeData.url,
        };

        return route;
    });

    return routes;
};
