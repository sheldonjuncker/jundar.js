/**
 * The base class for all DOM Element Objects.
 */
function JundarEl(element, children)
{
	//The underlying DOM element
	this.element = element || null;

	//An array of JundarEl children
	this.children = children || [];
}

/**
 * Uses an HTML template to setup the object.
 * @param html An HTML string
 */
JundarEl.prototype.fromHTML = function(html){
	//Create the element inside of a div
	let div = document.createElement("div");
	div.innerHTML = html;

	//Extract the element
	let element = div.firstChild;

	//Built the JundarElement representation
	let jundarElement= this.buildElement(element);

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
	let jundarElement = new JundarEl(element);

	//Generate a class component from a <Class> element
	if(element.tagName == "CLASS")
	{
		//Create the class's object
		let className = element.getAttribute("name");
		jundarElement = new window[className]();

		//Assign attributes if any were supplied
		let attributes = element.attributes;
		for(let i=0; i<attributes.length; i++)
		{
			let attr = attributes[i];

			//Ignore the special "name" and "prop" attributes
			if(attr.nodeName == "name" || attr.nodeName == "class")
				continue;
			
			//Set the property's value or HTML
			if(jundarElement[attr.nodeName] instanceof JundarEl)
			{
				//Set the HTML of the Jundar Element
				jundarElement[attr.nodeName].html(attr.nodeValue);
			}

			else
			{
				//Set the value
				jundarElement[attr.nodeName] = attr.nodeValue;
			}
		}

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
		index = this.children.length - index;

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
			index = this.children.length - index;
		
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