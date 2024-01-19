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

This api sends requests to a database stored locally.

To configure local database environments, *.env* files must be created at the root level of the repository;

#### *.env.development*
    PGDATABASE=<development_database_name>

and 

#### *.env.test*
    PGDATABASE=<test_database_name>

>replace *development_database_name* and *test_database_name* accordingly

****
