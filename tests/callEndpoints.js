const {
    getCurrentBuses,
    getAgencies,
    getAgency,
    getAnnouncements,
    getRoutes,
    getSegments,
    getStops,
} = require("../dist/index");
global.fetch = require("node-fetch");

// This checks if the api calls are going through

getAgencies()
    .then(() => {
        console.log("✅ getAgencies");
    })
    .catch(() => {
        console.log("❌ getAgencies");
    });

getAgency("116")
    .then(() => {
        console.log("✅ getAgency");
    })
    .catch(() => {
        console.log("❌ getAgency");
    });

getRoutes("116")
    .then(() => {
        console.log("✅ getRoutes");
    })
    .catch(() => {
        console.log("❌ getRoutes");
    });

getCurrentBuses("116")
    .then(() => {
        console.log("✅ getCurrentBuses");
    })
    .catch(() => {
        console.log("❌ getCurrentBuses");
    });

getStops("116")
    .then(() => {
        console.log("✅ getStops");
    })
    .catch(() => {
        console.log("❌ getStops");
    });

getSegments("116")
    .then(() => {
        console.log("✅ getSegments");
    })
    .catch(() => {
        console.log("❌ getSegments");
    });

getAnnouncements("116")
    .then(() => {
        console.log("✅ getAnnouncements");
    })
    .catch(() => {
        console.log("❌ getAnnouncements");
    });
