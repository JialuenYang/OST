import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import YTPlayer from "./YTPlayer/YTPlayer";
import { PlayerInterface } from "./YTPlayer/YouTubeInterface";
import { OnProgressProps } from "react-player/base";
import { IconButton, Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { formattedSeconds } from "./Utils/utils";

const App = () => {
	const [player, setPlayer] = useState<PlayerInterface>();
	const [playing, setPlaying] = useState(true);
	const [playedSeconds, setPlayedSeconds] = useState(0);
	const [volume, setVolume] = useState<number>(50);
	const [prevVolume, setPrevVolume] = useState<number>(50);

	const handleVolumeChange = (event: any) => {
		setVolume(parseFloat(event.target.value));
	};

	const [played, setPlayed] = useState<number>(0);
	const [seeking, setSeeking] = useState(false);

	const updateProgress = (state: OnProgressProps) => {
		if (!seeking) {
			setPlayed(state.played);
		}
		setPlayedSeconds(state.playedSeconds);
	};

	const handleSeekChange = (event: any) => {
		setPlayed(parseFloat(event.target.value));
	};

	const handleSeekMouseDown = (event: React.MouseEvent) => {
		setSeeking(true);
	};

	const handleChangeEnd = (event: any, value: number | number[]) => {
		setSeeking(false);
		// player?.seekTo(
		// 	parseFloat((event.target as HTMLInputElement).value) *
		// 		player?.getDuration()
		// );
		player?.seekTo((value as number) * player?.getDuration());
	};

	return (
		<div>
			<div style={{ visibility: "visible" }}>
				<YTPlayer
					playerRef={setPlayer}
					url="https://www.youtube.com/watch?v=1i738h6F0hg"
					playing={playing}
					setPlaying={setPlaying}
					updateProgress={updateProgress}
					volume={volume}
					startSeconds={5}
				/>
			</div>
			<div className="fixed bottom-0 left-0 bg-gray-100 w-screen h-10 flex items-center justify-center border-solid border-t-1 border-l-0 border-r-0 border-b-0 border-gray-200">
				<IconButton
					disableRipple
					className="flex w-14"
					onClick={() => setPlaying(!playing)}
				>
					{playing ? <PauseIcon /> : <PlayArrowIcon />}
				</IconButton>
				<span className="flex font-sans text-sm w-10 pr-2">
					{formattedSeconds(playedSeconds || 0)}
				</span>
				<Slider
					className="flex-initial w-1/2 text-rose-500"
					aria-label="Small steps"
					size="small"
					disabled={player === undefined}
					defaultValue={0.00000005}
					step={0.000001}
					min={0}
					max={0.999999}
					valueLabelDisplay="auto"
					valueLabelFormat={(value) =>
						formattedSeconds(value * (player?.getDuration() || 0))
					}
					value={played}
					onMouseDown={handleSeekMouseDown}
					onChange={handleSeekChange}
					onChangeCommitted={handleChangeEnd}
					color="secondary"
				/>
				<span className="flex font-sans text-sm w-10 pl-3">
					{formattedSeconds(player?.getDuration() || 0)}
				</span>
				<IconButton
					disableRipple
					className="flex w-14"
					onClick={() => {
						if (volume == 0) {
							setVolume(prevVolume);
						} else {
							setPrevVolume(volume);
							setVolume(0);
						}
					}}
				>
					{volume == 0 && <VolumeMuteIcon />}
					{volume > 0 && volume < 50 && <VolumeDownIcon />}
					{volume >= 50 && <VolumeUpIcon />}
				</IconButton>
				<Slider
					className="flex-initial relative w-32 text-blue-500"
					size="small"
					min={0}
					max={100}
					step={1}
					value={volume}
					onChange={handleVolumeChange}
					valueLabelDisplay="auto"
					valueLabelFormat={(value) => `${value}%`}
				/>
			</div>
		</div>
	);
};

export default App;
