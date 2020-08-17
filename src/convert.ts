import { Agency } from "./types";

// This file converts JSON from the server to objects

const DATA_KEYS = {
    agencies: "agencies",
};

export const getAgenciesFromData = (data: any): Agency[] => {
    const agenciesData: any[] = data[DATA_KEYS.agencies];

    const agencies: Agency[] = agenciesData.map((agencyData) => {
        const agency: Agency = {
            affiliated_agencies: agencyData.affiliated_agencies,
            arrival_predictions: agencyData.arrival_predictions,
            bounds: agencyData.bounds,
            color: agencyData.color,
            has_notifications: agencyData.has_notifications,
            has_schedules: agencyData.has_schedules,
            has_trip_planning: agencyData.has_trip_planning,
            id: agencyData.id.toString(),
            location: agencyData.location,
            long_name: agencyData.long_name,
            name: agencyData.name,
            position: agencyData.position,
            short_name: agencyData.short_name,
            text_color: agencyData.text_color,
            timezone: agencyData.timezone,
            timezone_offset: agencyData.timezone_offset,
            url: agencyData.url || "",
        };

        return agency;
    });

    return agencies;
};
