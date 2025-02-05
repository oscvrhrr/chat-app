# chat-app

## Auth

| Description | Method      | URL |
| ----------- | ----------- | ---- |
| login user      |  POST      | /auth/login | 
| sign up user    |  POST      | /auth/signup|
| get me    |  GET      | /auth/me|

## Users

| Description | Method      | URL |
| ----------- | ----------- | ---- |
| get all users |  GET      | /users | 
| get a user    |  GET      | /users/:userid |
| get a user's profile |  GET | /users/:userid/profile | 
| get all profiles |  GET | /users/profiles | 
| update a user's profile |  UPDATE   | /users/:userid/profile |
| delete a user |  DELETE   | /users/:userid |      

## Conversations

| Description | Method      | URL |
| ----------- | ----------- | ---- |
| create new conversation | POST      | /conversations | 
| get a conversation |  GET      | /conversations/:conversationid | 
<!-- | delete a converstion |  DELETE   | /conversations/:userid |   
|             |  GET      | /conversations/:userid |
|             |  GET      | /conversations/:userid/profile | 
|             |  UPDATE   | /conversations/:userid/profile | -->