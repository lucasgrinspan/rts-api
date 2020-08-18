# rts-api
The unofficial JavaScript bindings for the RTS bus network API.
Note: since there is no public documentation for the API, I may have made some mistakes in my explanation of the fields, but the data is true to the response from the RTS servers. If there is a mistake, let me know.

## Installation
```
npm install rts-api
```

## Usage
```javascript
import { getCurrentBuses } from 'rts-api';

const agencyID = "116";

getCurrentBuses(agencyID)
  .then(buses => console.log(buses));
```

## Functions
#### `getCurrentBuses(agencyID: string)`
Returns an array of bus objects (promise).
Bus object:
| Field Name | Type | Description |
|-|-|-|
| `id` | `string` | Unique ID for this vehicle |
| `position` | `number[]` | The vehicle's current location (`[latitude, longitude]`) |
| `heading` | `number` | The vehicle's bearing where 0 is North, 90 is East, etc. Range: 0-360 |
| `currentStopID` | `string` | The ID of the stop that the vehicle is on |
| `agencyID` | `string` | The agency that this vehicle belongs to |
| `routeID` | `string` | The route that this vehicle is currently operating |
| `serviceStatus` | `string` | Is `"in_service"` if the vehicle is currently on its route |
| `tripID` | `string` | The trip that this vehicle belongs to (unsure) |
| `tripStart` | `Date` | The start time of this vehicle's service (unsure) |
| `tripEnd` | `Date` | The time that this vehicle will stop servicing its route (unsure) |
| `gtfsTripId` | `string` | The General Transit Feed Specification ID for this vehicle |
| `direction` | `boolean` | Unsure |
| `stopPatternID` | `string` | Unsure |
| `callName` | `string` | Unsure |
| `nextStopID` | `string` | The ID of the next stop that this vehicle will stop on |
| `arrivalStatus` | One of `"Early"` \| `"Late"` \| `"N/A"` \| `"On-Time"` | The status of the vehicle in relation to its schedule |
| `speed` | `number` | The vehicle's current velocity. Unsure if it's in mph or kph |
| `segmentID` | `string` | The current segment that this vehicle is on |
| `offRoute` | `boolean` | `true` if the vehicle is not currently on its route (due to detours) |
| `timestamp` | `number` | The time that this vehicle's location was queried in seconds after Unix epoch |
| `load` | `number` | The current passenger load, where 0 is empty and 1 is at full capacity |
| `apcStatus` | `string` | `up` if the vehicle's Automatic Passenger Counting is operational (lets you know if `load` is reliable) |

#### `getAgency(agencyID: string)`
Returns an agency objects (promise)
Agency object:
| Field Name | Type | Description |
|-|-|-|
| `affiliatedAgencies` | `string[]` | The affiliated agency IDs |
| `arrivalPredictions` | `boolean` | `true` if this agency provides predictions for bus arrivals |
| `bounds` | `number[]` | The coordinates of the top left and bottom right corner of a bounding box for this agency's area. `[latTopLeft, longTopLeft, latBottomRight, longBottomRight]` |
| `color` | `string` | The hex code for this agency's color |
| `hasNotifications` | `boolean` | `true` if this agency allows for notifications (mobile/desktop app) |
| `hasSchedules` | `boolean` | `true` if the vehicles in this agency are meant to follow a schedule |
| `hasTripPlanning` | `boolean` | `true` if this agency supports planning bus routes between two locations |
| `id` | `string` | The unique ID for this agency |
| `location` | `string` | The location for this agency. Typically follows `[city], [state abbr.]` format |
| `longName` | `string` | The name for this agency |
| `position` | `number[]` | The location for this agency. Note: not always the center of its bounding box. `[latitude, longitude]` |
| `shortName` | `string` | A condensed version of `longName` |
| `textColor` | `string` | The hex code for text that will be visible on this agency's color |
| `timezone` | `string` | The timezone of this agency |
| `timezoneOffset` | `number` | The offset in seconds from GMT |
| `url` | `string` | The URL for this agency's transit page |

#### `getAgencies()`
Returns `Promise<Agency[]>`

#### `getAnnouncements(agencyID: string)`


getAnnouncements,
    getRoutes,
    getSegments,
    getStops,
