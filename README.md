# JetAway

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

## Project Description

JetAway is a web-based airline reservation system with two phases one for the admin and another for the user. JetAway offers round trips for its users to search and reserve from. It also allows admins to create, edit and delete flights.

## Motivation

The motive behind this project is to facilitate the flight reservation process by enhancing the searching and selection processes.

## Tech

JetAway uses a number of open source projects to work properly:

- React - Javascript framework for frontend
- [node.js] - An open source development platform for executing - server-side javascript code.
- [Express] - Node.js framework for creating servers and APIs
- MongoDB - NoSQL database management system.

## Features

The user is able to..

- Search & Filter through a list of available flights based on his desired criteria

![alt text](https://github.com/advanced-computer-lab/WeekEnd-developers/blob/dev/pics/flights.png)

- Choose his seats on the flight
  ![alt text](https://github.com/advanced-computer-lab/WeekEnd-developers/blob/dev/pics/seats.png)

- Reserve and pay for his reservation online using his credit card
- Download his reservation ticket. (BONUS)
  ![alt text](https://github.com/advanced-computer-lab/WeekEnd-developers/blob/dev/pics/download.png)

- Edit his reservation and paying/getting the refund of the difference
- Cancel his reservation and request a refund.
- Email himself a copy of his reservation.
- Check the weather of the city he is travelling to. (BONUS)
  ![alt text](https://github.com/advanced-computer-lab/WeekEnd-developers/blob/dev/pics/ticket.png)
- Reset his password through his email. (BONUS)
- Change his password
- View his profile.

The admin is able to..

- View available flight
- Create flights
- Edit flights.
- Delete flights.
- The system is protected for both entities through private routes. (BONUS)
  ![alt text](https://github.com/advanced-computer-lab/WeekEnd-developers/blob/dev/pics/private.png)
- The interface between the frontend and the backend is protected by the use of the jsonwebtoken for data authentication.
- The data is validated in the front end and the backend interfaces.
- The user is informed and guided when errors occur.

## Installation

Install Node.js & React.
You can refer to these documents for installing the technologies
https://reactjs.org/docs/getting-started.html
https://nodejs.org/en/download/
then install the dependencies and start the server.
For starting the backend server:

```sh
cd backend
npm i
node app
```

For starting the frontend:

```sh
cd frontend
npm i
npm start
```

## Tests

Tests to validate the features and functionalities have been tested using unit tests (jest) and using postman

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## API Reference

#### Payement

```http
  POST /user/payement
```

Payement for a reservation.

| Body     | Type     | Description                                   |
| :------- | :------- | :-------------------------------------------- |
| `Amount` | `string` | _Required_. The amount to be paid by the user |

#### Edit Payement

```http
  POST /user/edit_payement
```

Edits the payement of the user after he edits his reservation.

| Body     | Type     | Description                                   |
| :------- | :------- | :-------------------------------------------- |
| `Amount` | `string` | _Required_. The amount to be paid by the user |

#### Cancel Reservation

```http
  PATCH /user/cancel_reservation/${reservation_number}
```

Cancel a reservation of the user
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `reservation_number` | `string` | _Required_. The number of the reservation to cancel |

#### Email Cancellation

```http
  POST /user/email_cancellation
```

Email sent to the user upon cancellation of reservation
| Body | Type | Description |
| :-------- | :------- | :------------------------- |
| `ReservationNumber` | `string` | _Required_. The number of the reservation |
| `Email` | `string` | _Required_. The email of the user to send on |
| `TotalPrice` | `string` | _Required_. The total price to be refunded |
| `FlightNumber` | `string` | _Required_. The number of the flight in the cancelled reservation|
| `FirstName` | `string` | _Required_. First name of the user |
| `LastName` | `string` | _Required_. Last name of the user |
| `ReturnPrice` | `string` | _Required_. |

#### Email Reservation

```http
  POST /user/email_reservation
```

Email sent to the user upon his reservation
| Body | Type | Description |
| :-------- | :------- | :------------------------- |
| `FirstBooking` | `string` | _Required_. The data of the departure trip |
| `SecondBooking` | `string` | _Required_. The data of the return trip |
| `Email` | `string` | _Required_. The total price to be refunded |
| `FirstName` | `string` | _Required_. First name of the user |
| `LastName` | `string` | _Required_. Last name of the user |

#### Email Partial Refund

```http
  POST /user/email_edit_refund
```

Email sent to the user informing him of a partial refund upon editing his reservation
| Body | Type | Description |
| :-------- | :------- | :------------------------- |
| `price` | `string` | _Required_. The amount to be refunded |
| `Email` | `string` | _Required_. The total price to be refunded |
| `FirstName` | `string` | _Required_. First name of the user |
| `LastName` | `string` | _Required_. Last name of the user |

#### Edit User

```http
  PATCH /user/edit_user/${Token}
```

Route for editing users' data
| Body | Type | Description |
| :-------- | :------- | :------------------------- |
| `id` | `json` | _Required_. The id of the user|

| Parameter | Type   | Description                                   |
| :-------- | :----- | :-------------------------------------------- |
| `Token`   | `json` | _Required_. Token for authenticating the user |

#### Edit User

```http
  GET /user/get_current_flights/${Token}
```

Route for finding current flights reserved by the user
| Body | Type | Description |
| :-------- | :------- | :------------------------- |
| `id` | `json` | _Required_. The id of the user|

| Parameter | Type   | Description                                   |
| :-------- | :----- | :-------------------------------------------- |
| `Token`   | `json` | _Required_. Token for authenticating the user |

#### Get all flights

```http
  GET /admin/get_all_flights
```

#### Get flight

```http
  GET /admin/get_flight/${flightID}
```

| Parameter  | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| `flightID` | `string` | **Required**. id of flight to fetch |

#### Create flight

```http
  POST /admin/create_flight
```

| Body                                                                                                                                 | Type   | Description                            |
| :----------------------------------------------------------------------------------------------------------------------------------- | :----- | :------------------------------------- |
| `{AllowedBaggege, DepartureTime, ArrivalTime, DepartureCountry,Departure, DepartureAirport, ArrivalCountry, Arrival, ArrivalAirport` | `json` | **Required**. body of flight to create |
| `DepartureTerminal, ArrivalTerminal, ArrivalTime, DepartureCountry,Departure, BusinessTotalSeats, BusinessPrice, EconomyTotalSeats`  |

| `EconomyPrice, FirstClassPrice, FirstClassSeats}`

#### Delete flight

```http
  DELETE /admin/delete_flight/${flightID}
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `flightID` | `string` | **Required**. id of flight to delete |

#### Update flight

```http
  PATCH /admin/update_flight/${flightID}
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `flightID` | `string` | **Required**. id of flight to update |

#### Edit reservation

```http
  PATCH /user/edit_reservation
```

| Body                                                    | Type   | Description                                                             |
| :------------------------------------------------------ | :----- | :---------------------------------------------------------------------- |
| `{booking, changedSeats, newSeats, oldChildren, Token}` | `json` | **Required**. new seats to be booked and old seats to mark as available |

#### Get all summaries

```http
  GET /user/summaries
```

| Body      | Type   | Description                                               |
| :-------- | :----- | :-------------------------------------------------------- |
| `{Token}` | `json` | **Required**. Token containing information about the user |

#### Create summary

```http
  POST /user/summaries
```

| Body                                                                 | Type   | Description                                                |
| :------------------------------------------------------------------- | :----- | :--------------------------------------------------------- |
| `{ DepartureFlight, ReturnFlight, DepartureBooking, ReturnBooking }` | `json` | **Required**. information about departure and return trips |

#### Get all upcoming flights

```http
  GET /user/all_flights
```

| Body  | Type  | Description                                |
| :---- | :---- | :----------------------------------------- |
| `N/A` | `N/A` | Fetches all upcoming flights in the future |

#### Get all return flights that the user has not booked yet

```http
  POST /user/return_flights
```

| Body                                           | Type   | Description                                                                                 |
| :--------------------------------------------- | :----- | :------------------------------------------------------------------------------------------ |
| `{ Departure, Arrival, DepartureDate, Token }` | `json` | Fetches all the available return flights based on the departure flights that the user chose |

#### Get all flights which their departure dates are in the future

```http
  GET /user/available_flights/${Token}
```

| Body        | Type   | Description                                                                     |
| :---------- | :----- | :------------------------------------------------------------------------------ |
| `{ Token }` | `json` | Fetches all the available flights which their departure dates are in the future |

#### Reserve flight

```http
  POST /user/reserve/${flightID}
```

|Parameter| Body | Type | Description |
| :-------- | :------- | | :------- |:-------------------------------- |
| `flightID` || `{ FlightNumber, TotalPrice, Seats, Children, Token }`| `json` | Reserves a flight forthe user based on the seats he chose|

#### Login

```http
  POST /login
```

| Body                   | Type   | Description                       |
| :--------------------- | :----- | :-------------------------------- |
| `{Username, Password}` | `json` | Login using username and password |

#### Register

```http
  POST /register
```

| Body                                                                                                                    | Type   | Description                      |
| :---------------------------------------------------------------------------------------------------------------------- | :----- | :------------------------------- |
| `{ Username, Email, Password, FirstName, LastName, Admin, HomeAddress, CountryCode, TelephoneNumbers, PassportNumber }` | `json` | Inserts the user in the database |

#### Get flight

```http
  GET /get_flight/:flightID
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `flightID` | `string` | _Required_. Id of a flight to be fetched |

#### Edit user data

```http
  PATCH /edit_user/:Token
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `Token`   | `string` | _Required_.Token for authenticating users' data |

#### Get user

```http
  GET /get_user/:Token
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `Token`   | `string` | _Required_.Token for authenticating users' data |

#### Change user password

```http
  PATCH /change_password/:Token
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `Token`   | `string` | _Required_.Token for authenticating users' data |

| Body                      | Type   | Description                        |
| :------------------------ | :----- | :--------------------------------- |
| `{OldPassword, Password}` | `json` | user old password and new password |

#### Request reset password

```http
  POST /requestResetPassword
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `Token`   | `string` | Token for authenticating users' data |

| Body      | Type   | Description |
| :-------- | :----- | :---------- |
| `{email}` | `json` | user email  |

#### Reset password

```http
  POST /resetPassword
```

| Body                   | Type   | Description                                           |
| :--------------------- | :----- | :---------------------------------------------------- |
| `{Token, newPassword}` | `json` | Token for authenticating users' data and new password |

## Roadmap

- Deployement

- Logging in with Google & Facebook

## Credits

antd: https://ant.design/ <br/>
Material UI: https://mui.com/ <br/>
React icons: https://react-icons.github.io/react-icons/ <br/>
