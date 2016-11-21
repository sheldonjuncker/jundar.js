/**
 * The user class component.
 */
function User(props)
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
			I'm <strong prop="name">${props.name}</strong>
			aka
			<em prop="username">${props.username}</em>.
		</span>

		<Class name="UserLocation" prop="location" city="Toccoa" state="GA" />
	 </div>`;

	 //Build the User object
	this.fromHTML(this.layout);
}

//Inherits from JundarEl
User.prototype = Object.create(JundarEl.prototype);


/**
 * The user location class component.
 */
function UserLocation(props)
{
	///The user's city
	this.city = null;

	///The user's state
	this.state = null;

	///The HTML layout of a user's location
	this.layout = 
	`<span class="user-location">
		I live in
		<span prop="city">${props.city}</span>,
		<span prop="state">${props.state}</span>
	 </span>`;

	 //Build the UserLocation object
	this.fromHTML(this.layout);
}

//Inherits from JundarEl
UserLocation.prototype = Object.create(JundarEl.prototype);

//Create a user and add him to the page
let sheldon = new User({name: "Sheldon Juncker", username: "jundar"});

document.body.append(sheldon.getElement());