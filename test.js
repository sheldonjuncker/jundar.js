function Player()
{
	///DOM Elements
	this.name = null;
	this.chipsBet = null;
	this.card = null;

	this.layout = 
	`<div class="player">
		<div class="info">
			<span class="name" prop="name"></span>
			<span class="chipsBet" prop="chipsBet"></span>
		</div>
		<Class name="Card" prop="card" />
	</div>`;
	this.fromHTML(this.layout);
}