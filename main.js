const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const otat = express();

const http = require("http").createServer(otat);
const parse = require("http");
const middlewares = [
  // ...
  bodyParser.urlencoded({ extended: true }),
];

//Importing the dotenv file
dotenv.config();
otat.use(middlewares);
otat.use(bodyParser.json());

const Amadeus = require('amadeus');
const { response } = require("express");

// Authentication, headers
const amadeus = new Amadeus({
    clientId: process.env.UID,
    clientSecret: process.env.UST
});

//Connecting to Frontend
//Where additional files will be or should be located
otat.set("view engine", "ejs");
//Additional file paths ends here
const publicDirectory = path.join(__dirname, 'assets')
otat.use(express.static(publicDirectory));

// Main page to rendering
otat.get(`/`, (req, res) => {
  res.render("flights")
});

// Rendering the booking page 
otat.get("/book", function (req, res) {
  res.render("book")
})

// Rendering the flight search result page 
otat.get("/index", function (req, res) {
  res.render("index")
})
otat.get("/flightCreateOrder", function(req, res){
  res.redirect("/");
})

// Flight offers search
otat.post("/index", function (req, res) { 
        departure = req.body.depature; 
        arrival = req.body.arrival; 
        locationDeparture = req.body.locationDeparture; 
        locationArrival = req.body.locationArrival;
        adults = req.body.adults;
  global.response = amadeus.shopping.flightOffersSearch 
    .get({ 
      originLocationCode: locationDeparture, 
      destinationLocationCode: locationArrival, 
      departureDate: departure, 
      adults: adults, 
    })
    .then(function(r){
      // console.log(r.data) for debugging purposes
      res.render("index",{fl:r});
    })
    .catch((err) => console.log(err)); 
}); 

// otat.locals.fl = require ("./flight-data.json");


//City search
otat.get("/citySearch", async (req, res) => {
  var keywords = req.query.keyword;
  const response = await amadeus.referenceData.locations
    .get({
      keyword: keywords,
      subType: "CITY,AIRPORT",
    }).then(function(response){
      res.render("city", {city:response.data})
      // console.log(response.data)
    })
    .catch((err) => console.log(err)); 
});

// Flight Booking 
otat.post("/flightCreateOrder", async function (req, res) {
  res.json(req.body);
  
  dateOfBirth = req.body.dateOfBirth;
  firstName = req.body.firstName;
  lastName = req.body.lastName;
  emailAddress = req.body.emailAddress;
  countryCallingCode = req.body.countryCallingCode;
  number = req.body.number;
  documentType = req.body.documentType;
  issuanceLocation = req.body.issuanceLocation;
  issuanceDate = req.body.issuanceDate;
  expiryDate = req.body.expiryDate;
  pnumber = req.body.pnumber;
  deviceType = req.body.deviceType
  locationDeparture = req.body.locationDeparture; 
  locationArrival = req.body.locationArrival;

  let inputFlightCreateOrder = req.body;
  console.log(req.body);
  const returnBokkin = await amadeus.booking.flightOrders
    .post(
       JSON.stringify({
        data: {
          type: "flight-order",
          flightOffers: [inputFlightCreateOrder],
          travelers: [
            {
              id: "1",
              dateOfBirth: req.body.dateOfBirth,
              name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
              },
              gender: req.body.gender,
              contact: {
                emailAddress: req.body.emailAddress,
                phones: [
                  {
                    deviceType: req.body.deviceType,
                    countryCallingCode: req.body.countryCallingCode,
                    number: req.body.number,
                  },
                ],
              },
              documents: [
                {
                  documentType: req.body.documentType,
                  birthPlace: req.body.birthPlace,
                  issuanceLocation: req.body.issuanceLocation,
                  issuanceDate: req.body.issuanceDate,
                  pnumber: req.body.pnumber,
                  expiryDate: req.body.expiryDate,
                  issuanceCountry: req.body.issuanceCountry,
                  nationality: req.body.nationality,
                  holder: true,
                },
              ],
            } 
          ],
        },
      })
    )
  // gender = req.body.gender; not needed!
  // issuanceCountry = req.body.issuanceCountry; not needed!
  // nationality = req.body.nationality; not needed!
    .then(function (response) {
      console.log(response.result);
      confirmOrder = response.result;
    })
    .catch(function (responseError) {
      console.log(responseError);
    });
});


// Setting the port server should listen from 
otat.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
