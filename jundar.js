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
 * Gets the underlying DOM element.
 */
JundarEl.prototype.getElement = function(){
	return this.element;
};

/**
 * Gets the element's children.
 */
JundarEl.prototype.getChildren = function(){
	return this.children;
};