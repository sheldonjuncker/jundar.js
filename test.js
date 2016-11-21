/**
 * The user class component.
 */
function User(props)
{
	///Object properties
	this.props = props;

	///The user's name
	this.name = null;

	///The user's username
	this.username = null;

	///The user's location
	this.location = null;

	 //Build the User object
	this.fromHTML();
}

//Inherits from JundarEl
User.prototype = Object.create(JundarEl.prototype);

/**
 * Gets the HTML string layout of a user's location.
 */
User.prototype.getLayout = function(){
	return(
		`<div class="user">
			<span>
				I'm <strong prop="name">${this.props.name}</strong>
				aka
				<em prop="username">${this.props.username}</em>.
			</span>

			<Class name="UserLocation" prop="location" city="Toccoa" state="GA" />
		</div>`
	);
};

/**
 * The user location class component.
 */
function UserLocation(props)
{
	//Object properties
	this.props = props;

	///The user's city
	this.city = null;

	///The user's state
	this.state = null;

	 //Build the UserLocation object
	this.fromHTML();
}

//Inherits from JundarEl
UserLocation.prototype = Object.create(JundarEl.prototype);

/**
 * Gets the HTML string layout of a user's location.
 */
UserLocation.prototype.getLayout = function(){
	return(
		`<span class="user-location">
			I live in
			<span prop="city">${this.props.city}</span>,
			<span prop="state">${this.props.state}</span>
		</span>`
	);
};

//Create a user and add him to the page
let sheldon = new User({name: "Sheldon Juncker", username: "jundar"});

document.body.append(sheldon.getElement());