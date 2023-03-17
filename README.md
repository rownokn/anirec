# Anime Project (AniRec)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Tech Stack](#tech_stack)



## About 

An Anime Information Platform that provides most of the anime information. 

This application can be used as a anime watching tracker to keep track of status and how many episodes that the user watched. The users can also rate and provide their input on the anime and add anime to favorites as well. 

Recommendations are based on activities and reviews similar to other users. 

Recommendations are also based on other similar anime. 

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


