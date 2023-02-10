import YouTube, { YouTubeProps } from "react-youtube";

const Player = (props: {
	videoId: string;
	startSeconds?: number;
	endSeconds?: number;
}) => {
	const { videoId, startSeconds, endSeconds } = props;

	// Autoplay with sound problem:
	// https://support.google.com/youtube/thread/144579455/how-to-autoplay-a-youtube-video-on-my-home-page?hl=en

	let playerVars: any = {
		autoplay: 1, // Auto-play the video on load
		// controls: 0, // Show pause/play buttons in player
		showinfo: 0, // Hide the video title
		modestbranding: 1, // Hide the Youtube Logo
		fs: 0, // Hide the full screen button
		cc_load_policy: 0, // Hide closed captions
		iv_load_policy: 3, // Hide the Video Annotations
		enablejsapi: 1,
		autohide: 0, // Hide video controls when playing
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

	// https://developers.google.com/youtube/player_parameters
	const playerConfig = {
		playerVars,
		videoId: videoId,
		height: "300",
		width: "450",
	};

	// https://developers.google.com/youtube/iframe_api_reference
	const onReady: YouTubeProps["onReady"] = (event) => {
		// access to player in all event handlers via event.target
		event.target.playVideo();
	};

	const onEnd: YouTubeProps["onEnd"] = (event) => {
		if (startSeconds === undefined) {
			event.target.seekTo(0);
		} else {
			event.target.seekTo(startSeconds);
		}
	};

	return (
		<YouTube
			videoId={videoId}
			opts={playerConfig}
			onReady={onReady}
			onEnd={onEnd}
		/>
	);
};

export default Player;
