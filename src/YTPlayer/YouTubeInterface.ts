export interface PlayerInterface {
	playVideo(): void;
	getDuration(): number;
	getCurrentTime(): number;
	seekTo(value: number): void;
	setVolume(value: number): void;
}

// https://developers.google.com/youtube/player_parameters#Parameters
export interface PlayerVars {
	autoplay?: number; // 0 or 1. Default 0.
	cc_lang_pref?: number;
	cc_load_policy?: number;
	color?: string;
	controls?: number; // 0 or 1. Default 0.
	disablekb?: number;
	enablejsapi?: number;
	end?: number;
	fs?: number;
	hl?: string;
	iv_load_policy?: number;
	list?: string;
	listType?: string;
	loop?: number;
	modestbranding?: number;
	mute?: number; // Not listed on the parameters for some reason
	origin?: number;
	playlist?: string;
	playsinline?: number;
	rel?: number;
	start?: number;
	widget_referrer?: string;
}
