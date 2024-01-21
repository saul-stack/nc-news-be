 Northcoders News API
=========

Introduction
------------

*A brief overview of the project, and the background to it. Its uses... Come back to this* ... 

Setup
------------

1.  Clone the repository

        $ git clone https://github.com/saul-stack/NC-Server-BE.git

    ---

2. Navigate to the repository's root directory and install the required node packages:

        $ npm install dotenv
        $ npm install express
        $ npm install pg
    ---

    >*Optional (for testing)*  

        $ jest
        $ jest-sorted
        $ supertest
----

## Instructions to run locally:

The API sends PSQL query requests to a *local database*.
To configure the local database environment:

1. Navigate to the *root* level of the repository, and create a *.env* file:

        $ touch .env.database_name

    containing:

        PGDATABASE=<database_name>

>replace *database_name* accordingly (development, test, production etc.)

****
