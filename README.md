About The Project
=================

An online portal for feedback submission and a backend module to process the submission.
The web portal has 2 main functions:
- submission
- check status

The backend module has 2 main functions:
- process incoming submission
- check submission status

Developed With
- ReactJS
- Spring Boot
- MySQL

### Steps to setup the application

1. Clone the repo:
   `git clone https://github.com/your_username_/Project-Name.git`
2. Set up and run a MySQL database on port 3306 (as specified in `feedbackApplication/resources/application.properties`)
   Indicate a username and password for accessing the MySQL database in `feedbackApplication/resources/application.properties`.
3. Create the database: ``create database feedback_db;``
4. From the feedbackApplication directory, run `./mvnw clean spring-boot:run`. 
   By default, this runs the application on port 8080.
5. The application can be accessed on localhost:8080.

#### Notes
The app relies on http://processfeedback.atwebpages.com/submit.php?feedback=<input> for obtaining the feedback's status.
If the returned sentiment is positive, then the status is considered "Accepted". 
Otherwise, if the returned sentiment is negative, the status is considered "Rejected".
For other responses, or if the service does not return within 15s, the returned status is "Unknown (Try again later)"


