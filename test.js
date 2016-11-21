//The cat component
function Cat(props)
{
    //Assign properties
    this.props = props;

	//The cat's name
	this.name = name;

    //Build the cat object and DOM elements
    this.build();
}

//Inherits from JundarEl
Cat.prototype = Object.create(JundarEl.prototype);

//Provides the HTML layout of a cat
Cat.prototype.getLayout = function(){
    return(
        `<span class="cat">
			I'm a cat. My name is 
			<span prop="name">${this.props.name}</span>.
		</span>`
    );
};

//The person component
function CoolPerson(props)
{
	//Assign properties
    this.props = props;

	//The person's name
    this.name = null;

	//The cat component
    this.cat = null;

	//Build the cat
	this.build();
}

//Inherits from JundarEl
CoolPerson.prototype = Object.create(JundarEl.prototype);

//Gets the layout of a person
CoolPerson.prototype.getLayout = function(){
    return(
        `<span class="person">
            I'm a person. My name is 
            <span prop="name">${this.props.name}</span>.
            Since I'm cool, I have a cat. This is my cat:<br>
			<Component class=":cat" prop="cat" />
        </span>`
    );
};

//Render a new person and their cat
let mrWhiskers = new Cat({name: "Mr. Whiskers"});
let person = new CoolPerson({name: "Bob", cat: mrWhiskers});
document.body.appendChild(person.getElement());