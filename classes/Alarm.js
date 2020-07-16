class Alarm {
	constructor() {
		this.elements = {
			alarms: $("#alarms"),
			alarmTime: $("#alarm-time"),
			alarmMessage: $("#alarm-message"),
			alarmAdd: $("#alarm-add"),
		};
		this.alarms = [];

		this.elements.alarmAdd.click(() => {
			const time = this.elements.alarmTime.val();
			const message = this.elements.alarmMessage.val();
			if (!time) return alert("Veuillez entrer un temps correct");

			const [hours, minutes] = time.split(":");
			const end = new Date();
			end.setHours(hours);
			end.setMinutes(minutes);
			end.setSeconds(0);
			end.setMilliseconds(0);

			this.alarms.push({
				end,
				hours,
				minutes,
				message,
				ended: false,
			});
		});

		setInterval(() => {
			this.refreshAlarms();
		}, 500);
	}

	refreshAlarms() {
		this.elements.alarms.empty();

		for (let [k, alarm] of Object.entries(this.alarms)) {
			k = parseInt(k); // ???
			if (alarm.end < Date.now() && !alarm.ended) {
				let message = `L'alarme n°${k + 1} sonne`;
				if (alarm.message) message += `:\n\n${alarm.message}`;
				alert(message);
				alarm.ended = true;
				continue;
			}

			this.elements.alarms.append(`
				<div class="alarm has-text-centered">
					<span>${alarm.hours}:${alarm.minutes}</span>
					<span>${alarm.ended ? "passée" : "dans " + this.formatTime(alarm.end.getTime() - Date.now())}</span>
				</div>
			`);
		}
	}

	formatTime(time) {
		const seconds = Math.floor(time / 1000);
		const minutes = Math.max(0, Math.min(59, Math.floor(seconds / 60)));

		return `${minutes.toString().padStart(2, "0")}:${(seconds % 60)
			.toString()
			.padStart(2, "0")}`;
	}
}
