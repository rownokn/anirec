# Anime Project (AniRec)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Tech Stack](#tech_stack)
- [Usage](#usage)



## About 

An Anime Information Platform that provides most of the anime information. 

This application can be used as a anime watching tracker to keep track of status and how many episodes that the user watched. The users can also rate and provide their input on the anime and add anime to favorites as well. 

Recommendations come in many form

Recommendation based on anime
![anime Recc](https://github.com/rnowrose/anirec/blob/main/profile.png)
Recommedation is at the bottom

Recommendation based on review and activty
![anime user Recc](https://github.com/rnowrose/anirec/blob/main/animerecommedation.png)

More Recommendations based on activty
![anime user Recc](https://github.com/rnowrose/anirec/blob/main/userreccanime.png)


Here is the database diagram for the anime application
![Database Diagram](https://github.com/rnowrose/anirec/blob/main/dbtable.png)

## Getting Started 

### Running the App

A step by step series of examples that tell you how to get a development env running.

To run the anime-api

```
gunicorn run:app 
```

And to run the anime-web

```
npm start
```

## Tech Stack  

**Client:** React, SASS 

**Server:** Python, Flask, PostgreSQL

## Usage
To Modify the status of the anime users want to watch

- Users are on the main page and then they click on the login link on the right hand corner

- They login with their user and password but first register if no account
  ![login](https://github.com/rnowrose/anirec/blob/main/login.png)

- After logging in they ger redired to the activity list page.
  ![userec pagec](https://github.com/rnowrose/anirec/blob/main/activitylist.png)

- select on of the anime for example Naruto then it will rediret them to this page
  ![profile](https://github.com/rnowrose/anirec/blob/main/fullprofile.png)

- click on the button that has the 'COMPLETED' written on it and it will direct to this modal
  ![profile](https://github.com/rnowrose/anirec/blob/main/useractivity.png)

- That is where they can do what they have to do
