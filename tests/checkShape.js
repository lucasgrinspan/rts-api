const { getAgencies, getRoutes, getSegments, getStops, getCurrentBuses } = require("../dist/index");
global.fetch = require("node-fetch");
let targets = process.argv.slice(2);

// This script allows you to check the shape of the data returned from each
// api call. The shapes that you want to check are passed in through command
// line arguments. For example:
// npm run-script check-shape -- agency route
// The above line will print out the agency and route shapes received from the API
// The available shapes that you can check are:
//   agency
//   route
//   bus
//   stop
//   segment
//   announcement

if (targets.length === 0) {
    targets = ["agency", "route", "bus", "stop", "segment", "announcement"];
}

targets.reduce(async (memo, target) => {
    await memo;
    let apiCall;
    switch (target) {
        case "agency":
            apiCall = getAgencies();
            break;
        case "route":
            apiCall = getRoutes("116");
            break;
        case "segment":
            apiCall = getSegments("116");
            break;
        case "stop":
            apiCall = getStops("116");
            break;
        case "bus":
            apiCall = getCurrentBuses("116");
            break;
        default:
            console.log(`${target} is not a valid data shape`);
            break;
    }

    if (apiCall) {
        console.log(target);
        try {
            const data = await apiCall;
            if (Array.isArray(data)) {
                console.log(data[0]);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    console.log("\n\n");
}, undefined);
