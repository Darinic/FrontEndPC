Instructions: 

1) Download/Copy the Repository

2) Terminal--> npm install (will install concurrently)

3) Terminal--> npm run install-all (will install both client and server dependencies)

4) Terminal --> npm start --> Front-end and Back-end should be operational now.  (will start both client and server side)

5) You cannot DELETE thoughts as it is locked to my mongoDB database. To change that you need to create your own Mongo_DB database in atlas (https://www.mongodb.com/atlas/database). and change information server directory --> .env file

6) to Test how AllThoughts look without information from database, just npm start only client side.

 ----------------------------------------------------------

Details: 

1) Responsive design (till width: 360px).

2) CSS was substituted for SCSS. While SCSS should have been removed from the app, I left it for evaluation purposes, just in case.

3) Failed/Sucessfull thought creation gives feedback.

4) App was tested on Chrome and Opera browsers.

5) Mongo database was used.

6) Pagination was used.

------------------------------------------------

Problems: 
***************
1)Search Bar, while {SearchTerm} is forwarded to AllThoughts, I have failed to implement it due to filtering thoughts it breaks Pagination, so I left it out. My goal was to allow filtering by hashtags. 
**************
-----------------------------------------------

How application could be improved:

1) Authentification and allowing to post new Thoughts to only authenticated users

2) Allowing Authentificated users delete their own posts.

3) Adding a like button and allowing only to authentificated users to like posts.

4) Displaying top 10 mostly liked posts in last week and all time. 

