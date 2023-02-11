import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import YTPlayer from "./YTPlayer/YTPlayer";
import { PlayerInterface } from "./YTPlayer/YouTubeInterface";
import { OnProgressProps } from "react-player/base";

const App = () => {
	const playerRef = (player: PlayerInterface) => {
		setPlayer(player);
	};

	const [player, setPlayer] = useState<PlayerInterface>();

	const [volume, setVolume] = useState<number>(0.5);

	const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setVolume(parseFloat(event.target.value));
	};

	const [played, setPlayed] = useState<number>(0);
	const [seeking, setSeeking] = useState(false);

	const updateProgress = (state: OnProgressProps) => {
		if (!seeking) {
			setPlayed(state.played);
		}
	};

	const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayed(parseFloat(event.target.value));
	};

	const handleSeekMouseDown = (event: React.MouseEvent) => {
		setSeeking(true);
	};

	const handleSeekMouseUp = (event: React.MouseEvent) => {
		setSeeking(false);
		player?.seekTo(
			parseFloat((event.target as HTMLInputElement).value) *
				player?.getDuration()
		);
	};

	return (
		<div className="App">
			<YTPlayer
				playerRef={playerRef}
				url="https://www.youtube.com/watch?v=1i738h6F0hg"
				updateProgress={updateProgress}
				volume={volume}
				startSeconds={5}
			/>
			<input
				type="range"
				min={0}
				max={0.999999}
				step="any"
				value={played}
				onMouseDown={handleSeekMouseDown}
				onChange={handleSeekChange}
				onMouseUp={handleSeekMouseUp}
			/>
			<input
				type="range"
				min={0}
				max={1}
				step="any"
				value={volume}
				onChange={handleVolumeChange}
			/>
		</div>
	);
};

export default App;
