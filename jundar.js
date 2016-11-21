/**
 * The base class for all Jundar Elements.
 * @param element The object's DOM element or a string with the HTML representation of the object
 * @param children An optional array of the object's children Jundar Elements
 */
function JundarEl(props, layout)
{
	/*
	* Note that we always assign values to element and children
	* to make it clear that Jundar Elements have these properties.
	*/

	//Object's properties
	this.props = props;

	//The underlying DOM element
	this.element = null;

	//An array of JundarEl children
	this.children = [];

	//If layout is a string, we will initialize the object from that string
	if(layout instanceof String || typeof layout === "string")
	{
		this.fromHTML();
	}
}

/**
 * Uses an HTML template to setup the object.
 * @param html An HTML string
 */
JundarEl.prototype.fromHTML = function(){
	//Create the element inside of a div
	let div = document.createElement("div");
	div.innerHTML = this.getLayout();

	//Extract the element
	let element = div.firstChild;

	//Built the JundarElement representation
	let jundarElement = this.buildElement(element);

	//Assign DOM element and children
	this.element = jundarElement.element;
	this.children = jundarElement.children;
};

/**
 * Recursively builds a JundarElement from a DOM element
 * @param element The DOM element
 */
JundarEl.prototype.buildElement = function(element){
	//The JundarElement
	let jundarElement = new JundarEl({});
	jundarElement.element = element;

	//Generate a class component from a <Class> element
	if(element.tagName == "CLASS")
	{
		//Get properties from HTML
		let props = {};
		for(let i=0; i<element.attributes.length; i++)
		{
			let attr = element.attributes[i];

			//Ignore the special "name" and "prop" attributes
			if(attr.nodeName == "name" || attr.nodeName == "prop")
				continue;
			
			//Assign to property map
			props[attr.nodeName] = attr.nodeValue;
		}

		//Create the class's object
		let className = element.getAttribute("name");
		jundarElement = new window[className](props);

		//Replace the Class node with the generated DOM element
		element.parentNode.replaceChild(jundarElement.getElement(), element);
	}

	//Assign properties to object
	if(element.nodeType == 1 && element.hasAttribute("prop"))
	{
		this[element.getAttribute("prop")] = jundarElement;
	}

	//Get children, but don't replace children if they're already present
	if(jundarElement.children.length == 0)
	{
		//Build JundarElement for each child node
		let children = [];
		for(let i=0; i<element.childNodes.length; i++)
		{
			let child = element.childNodes[i];
			children.push(this.buildElement(child));
		}
		jundarElement.children = children;
	}

	return jundarElement;
};

/**
 * Gets or sets the innerHTML of an element.
 * @param html The string to set the innerHTML to if passed
 */
JundarEl.prototype.html = function(html){
	if(html != undefined)
		this.getElement().innerHTML = html;
	else
		return this.getElement().innerHTML;
};

/**
 * Assigns one Jundar Element to another, replacing the underlying DOM elements.
 * @param el The Jundar Element to replace the current one with
 */
JundarEl.prototype.assign = function(el){
	//Get element to replace
	let toReplace = this.element;

	//Insert new element before
	toReplace.parentNode.insertBefore(el.element, toReplace);

	//Remove original element
	toReplace.parentNode.removeChild(toReplace);

	//Assign all properties of el to this
	for(let prop in el)
	{
		this[prop] = el[prop];
	}
};

/**
 * Appends a child JundarElement.
 */
JundarEl.prototype.appendChild = function(child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
};

/**
 * Removes a child based on index.
 * @param index The index of the child to remove
 */
JundarEl.prototype.removeChild = function(index){
	//Account for negative indexes
	if(index < 0)
		index = this.children.length + index;

	console.log(index);

	//Only remove the element if we're in the bounds of the array
	if(index < this.children.length && index >= 0)
	{
		//Remove DOM element
		let child = this.children[index].getElement();
		child.parentNode.removeChild(child);

		//Remove child object
		this.children.splice(index, 1);
	}
};

/**
 * Insert a child object at any index.
 * @param index The position at which to insert the item
 * @param el The Jundar Element to insert
 */
JundarEl.prototype.insertChild = function(index, el){
	//If empty, append
	if(this.children.length == 0)
		this.appendChild(el);
	else
	{
		//Get the correct index if negative
		if(index < 0)
			index = this.children.length + index;
		
		//If the index is still negative, set it to 0
		if(index < 0)
			index = 0;
		
		//Find element to insert before
		let after = this.children[index].getElement();
		after.parentNode.insertBefore(el.getElement(), after);

		//Add the object to array of children
		this.children.splice(index, 0, el);
	}
};

/**
 * Empties an element (removes all children).
 */
JundarEl.prototype.empty = function(){
	//Remove children from DOM
	this.html("");
	
	//Remove child objects
	this.children = [];
};

/**
 * Removes the element from the DOM.
 */
JundarEl.prototype.remove = function(){
	//Remove the element and objects
	this.element.parentNode.removeChild(this.element);
	this.element = null;
	this.children = [];
};

/**
 * Gets the underlying DOM element.
 */
JundarEl.prototype.getElement = function(){
	return this.element;
};

/**
 * Gets the element's children. (Not DOM elements)
 */
JundarEl.prototype.getChildren = function(){
	return this.children;
};