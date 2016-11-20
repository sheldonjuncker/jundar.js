/**
 * The user class component.
 */
function User(name, username)
{
	///The user's name
	this.name = null;

	///The user's username
	this.username = null;

	///The user's location
	this.location = null;

	///The HTML layout of a User
	this.layout = 
	`<div class="user">
		<span>
			I'm <strong prop="name"></strong>
			aka
			<em prop="username"></em>.
		</span>

		<Class name="UserLocation" prop="location" city="Toccoa" state="GA">
	 </div>`;

	 //Build the User
	this.fromHTML(this.layout);

	//Assign properties
	this.name.html(name);
	this.username.html(username);
}

//Inherits from JundarEl
User.prototype = Object.create(JundarEl.prototype);


/**
 * The user location class component.
 */
function UserLocation(city, state)
{
	///The user's city (DOM element)
	this.city = null;

	///The user's state (DOM element)
	this.state = null;

	///The HTML layout of a user's location
	this.layout = 
	`<span class="user-location">
		I live in
		<span prop="city"></span>,
		<span prop="state"></span>
	 </span>`;

	 //Build the User
	this.fromHTML(this.layout);

	//Assign properties
	this.city.html(city);
	this.state.html(state);
}

//Inherits from JundarEl
UserLocation.prototype = Object.create(JundarEl.prototype);

//Create a user and add him to the page
let sheldon = new User("Sheldon Juncker", "jundar");

document.body.append(sheldon.getElement());