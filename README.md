# rts-api

An unofficial JavaScript bindings for the RTS bus network API.

Note: since there is no public documentation for the API, the usage of some of the data points provided by the API is unknown, but the data is provided anyway, unmodified from the original data, only organized. If there is a mistake, let me know.

Most of the data provided by the API will be unnecessary for the average use case of this project, so the data fields are sorted by utility in the docs below.

-   [rts-api](#rts-api)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Functions](#functions)
        -   [`getCurrentBuses(agencyID: string, routeID?: string)`](#getcurrentbusesagencyid-string-routeid-string)
        -   [`getAgency(agencyID: string)`](#getagencyagencyid-string)
        -   [`getAgencies()`](#getagencies)
        -   [`getStops(agencyID: string, routeID?: string)`](#getstopsagencyid-string-routeid-string)
        -   [`getStopById(agencyID: string, stopID: string)`](#getstopbyidagencyid-string-stopid-string)
        -   [`getRoutes(agencyID: string)`](#getroutesagencyid-string)
        -   [`getRouteById(agencyID: string, routeID: string)`](#getroutebyidagencyid-string-routeid-string)
        -   [`getSegments(agencyID: string, routeID?: string)`](#getsegmentsagencyid-string-routeid-string)
        -   [`getAnnouncements(agencyID: string)`](#getannouncementsagencyid-string)
    -   [Data Types](#data-types)
        -   [Vehicle](#vehicle)
        -   [Agency](#agency)
        -   [Stop](#stop)
        -   [Route](#route)
        -   [Segment](#segment)
        -   [Announcement](#announcement)

## Installation

```
npm install rts-api
```

## Usage

Each of the functions below require an agency ID, which represents an area where RTS buses run. For example, the agency ID for the Gainesville area is `116`. Use [`getAgencies()`](#getagencies) and check the response for the agency that covers your area.

```javascript
import { getCurrentBuses } from "rts-api";

const agencyID = "116";

getCurrentBuses(agencyID).then((buses) => console.log(buses));
```

## Functions

The following functions make a GET requesat to the RTS API:

Each function below returns a promise that resolves to the data.

#### `getCurrentBuses(agencyID: string, routeID?: string)`

Returns an array of [bus objects](#vehicle) that are currently in service. If the routeID parameter is provided, then only the buses on that route will be returned.

#### `getAgency(agencyID: string)`

Returns an [agency](#agency)

#### `getAgencies()`

Returns an array of [agency](#agency)

#### `getStops(agencyID: string, routeID?: string)`

Returns an array of [bus stop](#stop) for the specified agency. If the routeID parameter is provided, then only the stops that make up that route will be returned.

#### `getStopById(agencyID: string, stopID: string)`

Returns the [bus stop](#stop) that matches the provided stopID.

#### `getRoutes(agencyID: string)`

Returns an array of [route](#route) that are in the specified agency.

#### `getRouteById(agencyID: string, routeID: string)`

Returns a [route](#route) that matches the provided route ID.

#### `getSegments(agencyID: string, routeID?: string)`

Returns an array of [segments](#segment). If a route ID is provided, then only the segments on that route are returned

Segments are used to draw the routes on a map.

#### `getAnnouncements(agencyID: string)`

Returns an array of [announcement](#announcement) for the specified agency.

## Data Types

### Vehicle

| Field Name      | Type                                                   | Description                                                                                             |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `id`            | `string`                                               | Unique ID for this vehicle                                                                              |
| `position`      | `number[]`                                             | The vehicle's current location (`[latitude, longitude]`)                                                |
| `heading`       | `number`                                               | The vehicle's bearing where 0 is North, 90 is East, etc. Range: 0-360                                   |
| `speed`         | `number`                                               | The vehicle's current velocity. Unsure if it's in mph or kph                                            |
| `routeID`       | `string`                                               | The route that this vehicle is currently operating                                                      |
| `currentStopID` | `string`                                               | The ID of the stop that the vehicle is on                                                               |
| `nextStopID`    | `string`                                               | The ID of the next stop that this vehicle will stop on                                                  |
| `agencyID`      | `string`                                               | The agency that this vehicle belongs to                                                                 |
| `serviceStatus` | `string`                                               | Is `"in_service"` if the vehicle is currently on its route                                              |
| `tripID`        | `string`                                               | The trip that this vehicle belongs to (unsure)                                                          |
| `tripStart`     | `Date`                                                 | The start time of this vehicle's service (unsure)                                                       |
| `tripEnd`       | `Date`                                                 | The time that this vehicle will stop servicing its route (unsure)                                       |
| `gtfsTripId`    | `string`                                               | The General Transit Feed Specification ID for this vehicle                                              |
| `direction`     | `boolean`                                              | Unsure                                                                                                  |
| `stopPatternID` | `string`                                               | Unsure                                                                                                  |
| `callName`      | `string`                                               | Unsure                                                                                                  |
| `arrivalStatus` | One of `"Early"` \| `"Late"` \| `"N/A"` \| `"On-Time"` | The status of the vehicle in relation to its schedule                                                   |
| `segmentID`     | `string`                                               | The current segment that this vehicle is on                                                             |
| `offRoute`      | `boolean`                                              | `true` if the vehicle is not currently on its route (due to detours)                                    |
| `timestamp`     | `number`                                               | The time that this vehicle's location was queried in seconds after Unix epoch                           |
| `load`          | `number`                                               | The current passenger load, where 0 is empty and 1 is at full capacity                                  |
| `apcStatus`     | `string`                                               | `up` if the vehicle's Automatic Passenger Counting is operational (lets you know if `load` is reliable) |

### Agency

| Field Name           | Type       | Description                                                                                                                                                    |
| -------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | `string`   | The unique ID for this agency                                                                                                                                  |
| `longName`           | `string`   | The name for this agency                                                                                                                                       |
| `shortName`          | `string`   | A condensed version of `longName`                                                                                                                              |
| `position`           | `number[]` | The location for this agency. Note: not always the center of its bounding box. `[latitude, longitude]`                                                         |
| `location`           | `string`   | The location for this agency. Typically follows `[city], [state abbr.]` format                                                                                 |
| `bounds`             | `number[]` | The coordinates of the top left and bottom right corner of a bounding box for this agency's area. `[latTopLeft, longTopLeft, latBottomRight, longBottomRight]` |
| `color`              | `string`   | The hex code for this agency's color                                                                                                                           |
| `affiliatedAgencies` | `string[]` | The affiliated agency IDs                                                                                                                                      |
| `arrivalPredictions` | `boolean`  | `true` if this agency provides predictions for bus arrivals                                                                                                    |
| `hasNotifications`   | `boolean`  | `true` if this agency allows for notifications (mobile/desktop app)                                                                                            |
| `hasSchedules`       | `boolean`  | `true` if the vehicles in this agency are meant to follow a schedule                                                                                           |
| `hasTripPlanning`    | `boolean`  | `true` if this agency supports planning bus routes between two locations                                                                                       |
| `textColor`          | `string`   | The hex code for text that will be visible on this agency's color                                                                                              |
| `timezone`           | `string`   | The timezone of this agency                                                                                                                                    |
| `timezoneOffset`     | `number`   | The offset in seconds from GMT                                                                                                                                 |
| `url`                | `string`   | The URL for this agency's transit page                                                                                                                         |

### Stop

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

### Route

| Field Name    | Type       | Description                                                                                                     |
| ------------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| `id`          | `string`   | The unique ID for this route                                                                                    |
| `isActive`    | `boolean`  | `true` if this route is currently servicing passengers                                                          |
| `longName`    | `string`   | The name for this route                                                                                         |
| `shortName`   | `string`   | The condensed route name, typically just the route number                                                       |
| `stops`       | `string[]` | The ID of stops that are in this route                                                                          |
| `segments`    | `string[]` | The ID of the segments that make up this route                                                                  |
| `bounds`      | `number[]` | The coordinates of the box that contain this route `[latTopLeft, longTopLeft, latBottomRight, longBottomRight]` |
| `color`       | `string`   | The hex code of the color of this route                                                                         |
| `description` | `string`   | A description for this route (largely unused)                                                                   |
| `agencyID`    | `string`   | The ID of the agency that this route belongs to                                                                 |
| `textColor`   | `string`   | The hex code for the text color that would be legible on this route's color                                     |
| `type`        | `string`   | The type of vehicle that operates this route, typically `"bus"`                                                 |
| `url`         | `string`   | The web page for the route's schedule                                                                           |

### Segment

| Field Name | Type     | Description                                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `points`   | `string` | [An encoded polyline for this segment](https://developers.google.com/maps/documentation/utilities/polylinealgorithm) |
| `levels`   | `string` | Specifies at which levels this segment is visible. Currently obsolete.                                               |
| `id`       | `string` | The unique ID for this segment                                                                                       |

### Announcement

| Field Name | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`       | `string` | The unique ID for this announcement                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `title`    | `string` | The title for this announcement`| |`urgent`|`boolean`|`true`if the announcement is urgent | |`content`|`string`| HTML content accompanying this announcement. | |`date`|`string`| The date of the announcement. Typically in`YYYY/MM/DD`format | |`startAt`|`Date`| The date on which the announcement's changes become effective | |`agencyID`|`string`| The ID of the agency that this announcement applies to | |`hasContent`|`boolean`|`true`if the`content`field has a value |
