# rts-api

An unofficial JavaScript bindings for the RTS bus network API.

Note: since there is no public documentation for the API, the usage of some of the data points provided by the API is unknown, but the data is provided anyway, unmodified from the original data, only organized. If there is a mistake, let me know.

Most of the data provided by the API will be unnecessary for the average use case of this project, so the data fields are sorted by utility in the docs below.

-   [rts-api](#rts-api)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Functions](#functions)
        -   [`getCurrentBuses(agencyID: string)`](#getcurrentbuses-agencyid-string)
        -   [`getAgency(agencyID: string)`](#getagency-agencyid-string)
        -   [`getAgencies()`](#getagencies)
        -   [`getStops(agencyID: string)`](#getstops-agencyid-string)
        -   [`getRoutes(agencyID: string)`](#getroutes-agencyid-string)
        -   [`getSegments(agencyID: string)`](#getsegments-agencyid-string)
        -   [`getAnnouncements(agencyID: string)`](#getannouncements-agencyid-string)

## Installation

```
npm install rts-api
```

## Usage

```javascript
import { getCurrentBuses } from "rts-api";

const agencyID = "116";

getCurrentBuses(agencyID).then((buses) => console.log(buses));
```

## Functions

The following data can be retrieved using the RTS API:

-   Agency
-   Vehicle
-   Bus Stop
-   Route
-   Segment
-   Announcement

The data types are defined below. The fields are sorted by utility to the average use case. Note: the usage of some fields are currently unknown.

Each function below returns a promise that resolves to the data.

#### `getCurrentBuses(agencyID: string)`

Returns an array of bus objects that are currently in service.

Bus object:
| Field Name | Type | Description |
|-|-|-|
| `id` | `string` | Unique ID for this vehicle |
| `position` | `number[]` | The vehicle's current location (`[latitude, longitude]`) |
| `heading` | `number` | The vehicle's bearing where 0 is North, 90 is East, etc. Range: 0-360 |
| `speed` | `number` | The vehicle's current velocity. Unsure if it's in mph or kph |
| `routeID` | `string` | The route that this vehicle is currently operating |
| `currentStopID` | `string` | The ID of the stop that the vehicle is on |
| `nextStopID` | `string` | The ID of the next stop that this vehicle will stop on |
| `agencyID` | `string` | The agency that this vehicle belongs to |
| `serviceStatus` | `string` | Is `"in_service"` if the vehicle is currently on its route |
| `tripID` | `string` | The trip that this vehicle belongs to (unsure) |
| `tripStart` | `Date` | The start time of this vehicle's service (unsure) |
| `tripEnd` | `Date` | The time that this vehicle will stop servicing its route (unsure) |
| `gtfsTripId` | `string` | The General Transit Feed Specification ID for this vehicle |
| `direction` | `boolean` | Unsure |
| `stopPatternID` | `string` | Unsure |
| `callName` | `string` | Unsure |
| `arrivalStatus` | One of `"Early"` \| `"Late"` \| `"N/A"` \| `"On-Time"` | The status of the vehicle in relation to its schedule |
| `segmentID` | `string` | The current segment that this vehicle is on |
| `offRoute` | `boolean` | `true` if the vehicle is not currently on its route (due to detours) |
| `timestamp` | `number` | The time that this vehicle's location was queried in seconds after Unix epoch |
| `load` | `number` | The current passenger load, where 0 is empty and 1 is at full capacity |
| `apcStatus` | `string` | `up` if the vehicle's Automatic Passenger Counting is operational (lets you know if `load` is reliable) |

#### `getAgency(agencyID: string)`

Returns an agency object

#### `getAgencies()`

Returns an array of agency objects

Agency object:
| Field Name | Type | Description |
|-|-|-|
| `id` | `string` | The unique ID for this agency |
| `longName` | `string` | The name for this agency |
| `shortName` | `string` | A condensed version of `longName` |
| `position` | `number[]` | The location for this agency. Note: not always the center of its bounding box. `[latitude, longitude]` |
| `location` | `string` | The location for this agency. Typically follows `[city], [state abbr.]` format |
| `bounds` | `number[]` | The coordinates of the top left and bottom right corner of a bounding box for this agency's area. `[latTopLeft, longTopLeft, latBottomRight, longBottomRight]` |
| `color` | `string` | The hex code for this agency's color |
| `affiliatedAgencies` | `string[]` | The affiliated agency IDs |
| `arrivalPredictions` | `boolean` | `true` if this agency provides predictions for bus arrivals |
| `hasNotifications` | `boolean` | `true` if this agency allows for notifications (mobile/desktop app) |
| `hasSchedules` | `boolean` | `true` if the vehicles in this agency are meant to follow a schedule |
| `hasTripPlanning` | `boolean` | `true` if this agency supports planning bus routes between two locations |
| `textColor` | `string` | The hex code for text that will be visible on this agency's color |
| `timezone` | `string` | The timezone of this agency |
| `timezoneOffset` | `number` | The offset in seconds from GMT |
| `url` | `string` | The URL for this agency's transit page |

#### `getStops(agencyID: string)`

Returns an array of bus stop objects for the specified agency.

| Field Name        | Type       | Description                                                  |
| ----------------- | ---------- | ------------------------------------------------------------ |
| `id`              | `string`   | The unique ID for this bus stop                              |
| `name`            | `string`   | The name for this bus stop                                   |
| `description`     | `string`   | A description of this bus stop, typically the stop's address |
| `position`        | `number[]` | The coordinates of this bus stop, `[latitude, longitude]`    |
| `locationType`    | `string`   | The type for this stop, typically `"stop"`                   |
| `parentStationID` | `string`   | The ID of this stop's parent station (largely unused)        |
| `code`            | `string`   | Unsure                                                       |
| `url`             | `string`   | The URL for this bus stop (largely unused)                   |

#### `getRoutes(agencyID: string)`

Returns an array of route objects that are in the specified agency.

Route object:
| Field Name | Type | Description |
|-|-|-|
| `id` | `string` | The unique ID for this route |
| `isActive` | `boolean` | `true` if this route is currently servicing passengers |
| `longName` | `string` | The name for this route |
| `shortName` | `string` | The condensed route name, typically just the route number |
| `segments` | `string[]` | The ID of the segments that make up this route |
| `bounds` | `number[]` | The coordinates of the box that contain this route `[latTopLeft, longTopLeft, latBottomRight, longBottomRight]` |
| `color` | `string` | The hex code of the color of this route |
| `description` | `string` | A description for this route (largely unused) |
| `agencyID` | `string` | The ID of the agency that this route belongs to |
| `textColor` | `string` | The hex code for the text color that would be legible on this route's color |
| `type` | `string` | The type of vehicle that operates this route, typically `"bus"` |
| `url` | `string` | The web page for the route's schedule |

#### `getSegments(agencyID: string)`

Returns a `Map`, where the key is the segment's unique ID and the value is the segment object.
Segments are used to draw the routes on a map.

Segment object:
| Field Name | Type | Description |
|-|-|-|
| `points` | `string` | [An encoded polyline for this segment](https://developers.google.com/maps/documentation/utilities/polylinealgorithm) |
| `levels` | `string` | Specifies at which levels this segment is visible. Currently obsolete. |

#### `getAnnouncements(agencyID: string)`

Returns an array of announcements for the specified agency.

Announcement object:
| Field Name | Type | Description |
|-|-|-|
|`id`|`string` | The unique ID for this announcement |
| `title` | `string` | The title for this announcement`| |`urgent`|`boolean`|`true`if the announcement is urgent | |`content`|`string`| HTML content accompanying this announcement. | |`date`|`string`| The date of the announcement. Typically in`YYYY/MM/DD`format | |`startAt`|`Date`| The date on which the announcement's changes become effective | |`agencyID`|`string`| The ID of the agency that this announcement applies to | |`hasContent`|`boolean`|`true`if the`content`field has a value |
