export const formattedSeconds = (totalSeconds: number) => {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	// If you want strings with leading zeroes:
	const minutesString = String(minutes).padStart(2, "0");
	const secondsString = String(seconds).padStart(2, "0");

	return minutesString + ":" + secondsString;
};
