
# Contents
Markup :
1. [Error Handling](#error-codes)
2. [Authentication](#using-authentication-methods)
   1. [Creating A New User](#how-to-create-a-new-user)
   2. [User Login](#how-to-login-a-user)
3. [Database Related Functions](#database)
   1. [Write Data](#adding-to-database)
   2. [Read Data](#get-data-from-database)

--------------------------------------------------------------------------------------------------------------------------------------

### Error codes:
```javascript
// auth/wrong-password
// auth/user-not-found
// auth/invalid-email
// auth/email-already-in-use
// auth/weak-password
// auth/too-many-requests
// auth/network-request-failed
```

# Using Authentication methods.
--------------------------------------------------------------------------------------------------------------------------------------
```javascript
import { logger, createUser, loginUser } from "./auth.js";  // if you wanted auth.js
```

## How to create a new user.

Syntax:
```javascript
createUser(email, password, user_details);
```

Usage:
```javascript
let user_details = {
    name: "Luffy",
    rno: "21BAI1129",  // also very important
    classNo: {
    0: "BCSE101P",
    1: "BCSE102P" , 
    2: "BCSE103P"
  },                // this is import cause we need to retrieve the classno. for live tests.
    email: "1ag5qfd@gmail.com",
};

//the stuff we are storing while creating a new user needs to be decided.

createUser("1ag5qfd@gmail.com", "123qwe123qwe", user_details);
```


--------------------------------------------------------------------------------------------------------------------------------------

## How to login a user.

Syntax:
```javascript
loginUser(email, password,rememberMe);
```

Usage:
```javascript
let rememberMe= false;    // this is optional. get from checkbox. if true then remember me is stored in localStorage else it is stored in sessionStorage.
loginUser("1ag5qfd@gmail.com", "123qwe123qwe",rememberMe);

//after logging in check for uid in either localStorage or sessionStorage.
```

### The following function is used to check if the user is logged in or not.
If the user is logged in, it returns the user's UID.
If the user is not logged in, it returns the error code. (in UID)

--------------------------------------------------------------------------------------------------------------------------------------

# Database
Prerequisites
```javascript
import { addToDB, getFromDB } from "./db.js";   // if you wanted db.js
```

## Adding to Database

Syntax:
```javascript
addToDB(locationWhereToStore , Data);
```
Usage:
```javascript
addToDB("users/some_weird_kid", {
    name: "ash ketchum",
    age: "11",
    goal: "To be the very best"
});
```

--------------------------------------------------------------------------------------------------------------------------------------

## Get data from database

Syntax:
```javascript
getFromDB(location);

/* --or-- */

let data = async () => {
    data = await getFromDB(location);
    console.log(data);
};
data();

```
Usage:
```javascript
let location = "users/yA8KApOFNgSiUujns2c7cMFjJK22";
getFromDB(location);

//after getting data from database check for fetchedData in sessionStorage. It will contain the last thing you got from getFromDB.

/* --or-- */

let location = "users/yA8KApOFNgSiUujns2c7cMFjJK22";
let data = async () => {
    data = await getFromDB(location);
    console.log(data);
};
data();

//same stuff but this one uses promises and so basically has a on ready thing.

```
