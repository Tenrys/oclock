class Timer {
	constructor() {
		this.elements = {
			timers: $("#timers"),
			timerMinutes: $("#timer-minutes"),
			timerSeconds: $("#timer-seconds"),
			timerAdd: $("#timer-add"),
		};
		this.timers = [];

		this.elements.timerAdd.click(() => {
			const seconds = parseInt(this.elements.timerSeconds.val());
			let minutes = parseInt(this.elements.timerMinutes.val());
			minutes = isNaN(minutes) ? 0 : minutes;
			if (isNaN(seconds)) return alert("Veuillez entrer un temps correct");

			this.timers.push({
				end: Date.now() + seconds * 1000 + 60 * minutes * 1000,
			});
		});

		setInterval(() => {
			this.refreshTimers();
		}, 500);
	}

	refreshTimers() {
		this.elements.timers.empty();

		for (let [k, timer] of Object.entries(this.timers)) {
			k = parseInt(k); // ???
			if (timer.end < Date.now()) {
				alert(`Le temps pour le minuteur n°${k + 1} est écoulé`);
				this.timers.splice(k, 1);
				continue;
			}

			const seconds = Math.ceil((timer.end - Date.now()) / 1000);
			const minutes = Math.max(0, Math.floor(seconds / 60));

			this.elements.timers.append(`
				<div class="timer has-text-centered">
					<span>${minutes.toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}</span>
				</div>
			`);
		}
	}
}
