// This file holds the definition for each resource
export interface Agency {
    affiliatedAgencies: string[];
    arrivalPredictions: boolean;
    bounds: number[];
    color: string;
    hasNotifications: boolean;
    hasSchedules: boolean;
    hasTripPlanning: boolean;
    id: number;
    location: string;
    longName: string;
    name: string;
    position: number[];
    shortName: string;
    textColor: string;
    timezone: string;
    timezoneOffset: number;
    url: string;
}

export interface Route {
    agencyID: string;
    bounds: number[];
    color: string;
    description: string;
    id: string;
    isActive: boolean;
    longName: string;
    segments: string[];
    shortName: string;
    textColor: string;
    type: string;
    url: string;
}

export interface Segment {
    levels: string;
    points: string;
}

export interface Stop {
    code: string;
    description: string;
    id: string;
    locationType: string;
    name: string;
    parentStationID: string;
    position: number[];
    url: string;
}
