# favespot-server
Favespot Back-end server

# Database and Api Key Configuration
  1.) create .env file and insert.
SECRET=my-secret-key
MAP_API_KEY=my-google-map-key
DB_HOST=localhost
DB_NAME=favespot
DB_USER=root
DB_PASS=

# Local Installation Procedure.
  1.) clone repository to local computer
  2.) type "npm install" in the command line
  3.) run the server by typing "npm run dev"
  


# Api Call URLs.
 POST Request: http://localhost:8080/api/auth/signup
    -user registration.
    -request body: 
        1.) firstName
        2.) lastName
        3.) email address
        4.) mobile
        5.) password
        6.) confirmPassword
    -response: 
        1.) user details
        2.) user token
        3.) success/error messages


  POST Request: http://localhost:8080/api/auth/signup
    -user registration.
    -request body: 
        1.) firstName
        2.) lastName
        3.) email address
        4.) mobile
        5.) password
        6.) confirmPassword

