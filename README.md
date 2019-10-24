# Project-2---Review-Site
Group Project - A site where a user can leave reviews




* When the user visits the home page, the will see a nav bar at the top of the page
* The user will see random reviews from previous users
* The home page will contain a brief description of the site and its purpose and general use
* The nav bar will be the main way the user moves around the site
  * Login
  * View other reviews
  * Create a review
  * A personal page
  * Logout
  
* The user will NOT have access to certain parts of the site while they remain logged out
* The user will have the ability to create, edit or delete a review, but only their own. 
* Users that are not logged in can still see other's reviews.


***Models***

User {
username: {type: String, require: true},
password: {type: String, require: true}
reviews: [{
}]
}

Reviews {
subject: {type: String, require: true},
rating: {type: String, require: true},
bodyOfDescription: {type: String}
}

* The User model will have a relationship with the Reviews model. So the reviews property of User is the reference to the Reviews model.








![Wireframe](wireframe.jpg)
