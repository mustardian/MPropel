import whatever js file you need first.

import { logger, createUser, loginUser } from "./auth.js";  // if you wanted auth.js

--------------------------------------------------------------------------------------------------------------------------------------

#how to create a new user.

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

#how to login a user.

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

--------------------------------------------------------------------------------------------------------------------------------------

#for database manipulation.
Syntax:
```javascript
import { addToDB, getFromDB } from "./db.js";   // if you wanted db.js
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

#get data from database

Syntax:
```javascript
getFromDB(location);
```
Usage:
```javascript
let location = "users/yA8KApOFNgSiUujns2c7cMFjJK22";
getFromDB(location);

//after getting data from database check for uid_data in sessionStorage.
```
