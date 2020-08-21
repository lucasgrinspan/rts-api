const { getStopById, getRouteById, getSegmentsOnRoute } = require("../dist/index");
global.fetch = require("node-fetch");

// Tests the functions in helperCalls.ts
const agencyID = "116";
const stopID = "4090618";
const routeID = "4001150";

getStopById(agencyID, stopID)
    .then(() => {
        console.log("✅ getStopById");
    })
    .catch((err) => {
        console.log("❌ getStopsById: " + err);
    });

getRouteById(agencyID, routeID)
    .then(() => {
        console.log("✅ getRouteById");
    })
    .catch((err) => {
        console.log("❌ getRouteById: " + err);
    });

getSegmentsOnRoute(agencyID, routeID)
    .then((segments) => {
        console.log("✅ getSegmentsOnRoute");
    })
    .catch((err) => {
        console.log("❌ getSegmentsOnRoute");
    });
