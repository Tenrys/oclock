class Clock {
	constructor() {
		this.elements = {
			clock: $("#clock"),
		};

		setInterval(() => {
			this.elements.clock.html(new Date().toLocaleTimeString("fr-FR"));
		}, 0);
	}
}
