class Stopwatch {
	constructor() {
		this.elements = {
			stopwatch: $("#stopwatch"),
			stopwatchToggle: $("#stopwatch-toggle"),
			stopwatchReset: $("#stopwatch-reset"),
			stopwatchLap: $("#stopwatch-lap"),
			laps: $("#laps"),
		};
		this.active = false;
		this.start = null;
		this.paused = null;
		this.laps = [];

		this.elements.stopwatchToggle.click(() => {
			this.active = !this.active;
			if (!this.start) {
				this.start = Date.now();
			}
			if (!this.active) {
				this.paused = Date.now();
				this.elements.stopwatchToggle.html("▶");
			} else {
				if (this.paused) {
					this.start = this.start + (Date.now() - this.paused);
					this.paused = null;
				}
				this.elements.stopwatchToggle.html("❚❚");
			}
		});
		this.elements.stopwatchReset.click(() => {
			this.active = false;
			this.start = null;
			this.paused = null;
			this.laps = [];
			this.elements.stopwatchToggle.html("▶");
			this.elements.stopwatch.html("00:00");
			this.elements.laps.empty();
		});
		this.elements.stopwatchLap.click(() => {
			const time = Date.now() - this.start;
			this.laps.push(time);
			this.elements.laps.append(
				`<div class="lap has-text-centered">
					<span>${this.formatTime(time)}</span>
				</div>`
			);
		});

		setInterval(() => {
			this.refreshStopwatch();
		}, 0);
	}

	refreshStopwatch() {
		if (!this.active) return;

		this.elements.stopwatch.html(this.formatTime(Date.now() - this.start));

		this.time++;
	}

	formatTime(time) {
		const seconds = Math.floor(time / 1000);
		const minutes = Math.max(0, Math.min(59, Math.floor(seconds / 60)));

		return `${minutes.toString().padStart(2, "0")}:${(seconds % 60)
			.toString()
			.padStart(2, "0")}`;
	}
}
