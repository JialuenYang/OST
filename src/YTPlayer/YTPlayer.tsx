import { OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player/youtube";
import { PlayerInterface, PlayerVars } from "./YouTubeInterface";

type Props = {
	playerRef(player: any): void;
	url: string;
	updateProgress(state: OnProgressProps): void;
	startSeconds?: number;
	endSeconds?: number;
	volume?: number;
};

const YTPlayer = (props: Props) => {
	/*
	Autoplay with sound problem:
	https://support.google.com/youtube/thread/144579455/how-to-autoplay-a-youtube-video-on-my-home-page?hl=en

	References:
	https://developers.google.com/youtube/player_parameters
	https://developers.google.com/youtube/iframe_api_reference
	*/

	const handleReady = () => {
		// this.player.playVideo();
	};

	const handleEnded = () => {
		// const { startSeconds } = this.props;
		// this.player.seekTo(startSeconds === undefined ? 0 : startSeconds);
		// this.player.playVideo();
	};

	const { playerRef, url, updateProgress, volume, startSeconds, endSeconds } =
		props;

	let playerVars: PlayerVars = {
		autoplay: 1, // Auto-play the video on load
		controls: 1, // Show pause/play buttons in player
		modestbranding: 1, // Hide the Youtube Logo
		fs: 0, // Hide the full screen button
		cc_load_policy: 0, // Hide closed captions
		iv_load_policy: 3, // Hide the Video Annotations
		enablejsapi: 1,
		loop: 1,
		// mute: 1,
	};

	if (startSeconds !== undefined) {
		playerVars = {
			...playerVars,
			start: startSeconds,
		};
	}

	if (endSeconds !== undefined) {
		playerVars = {
			...playerVars,
			end: endSeconds,
		};
	}

	return (
		<ReactPlayer
			ref={playerRef}
			url={url}
			config={{ playerVars }}
			playing={true}
			loop={true}
			volume={volume}
			onProgress={updateProgress}
			// onReady={handleReady}
			// onEnded={handleEnded}
		/>
	);
};

export default YTPlayer;
