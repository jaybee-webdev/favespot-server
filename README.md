# favespot-server
Favespot Back-end server

### Database and Api Key Configuration
  1.) create .env file and insert.
SECRET=my-secret-key
MAP_API_KEY=my-google-map-key
DB_HOST=localhost
DB_NAME=favespot
DB_USER=root
DB_PASS=

### Local Installation Procedure.
  1.) clone repository to local computer
  2.) type "npm install" in the command line
  3.) run the server by typing "npm run dev"
  


# Api Call URLs.
 POST Request: http://localhost:8080/api/auth/signup
    -user registration.
    -request body: 
         { firstName, lastName, email, mobile, password , confirmPassword }
    -response: 
        1.) user details
        2.) user token
        3.) success/error messages


  POST Request: http://localhost:8080/api/auth/signin
    -user signin.
    -request body: 
        { email, password }
        
   GET Request: http://localhost:8080/api/currentLocation/?lat=11.2315028&lon=125.001836
    -Get Current Location.
    -parameters: 
      lat
      long
    -response: Location Details 

          
   GET Request: http://localhost:8080/api/nearby/Users/?rad=1500&lat=11.174363&lon=124.954558&zip=6500
    -Get Nearby Users.
    -parameters: 
      rad = radius
      lat = latitude
      long = longitude
      zip = zip
    -response: Array[ Users Location ]
     
    GET Request: http://localhost:8080/api/searchAddress/?streetAddress=016+dadison+street&city=tacloban+city&state=&zip=6500
    -Get Address Details.
    -Parameters:
        Street Address
        City
        State
        zip( Postal Code is the same as Zip Code )
    -response: Address Details

### Try Live Server API's.
    https://favespot-server.herokuapp.com/api

### Static file Server. 
    https://favespot-server.herokuapp.com/static/{fileId}

    ex: https://favespot-server.herokuapp.com/static/-_Ppr0tyH4YNERDkMbHq-w.jpg



