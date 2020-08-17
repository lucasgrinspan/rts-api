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
    agencyID: number;
    bounds: number[];
    color: string;
    description: string;
    id: number;
    isActive: boolean;
    longName: string;
    shortName: string;
    textColor: string;
    type: string;
    url: string;
}
