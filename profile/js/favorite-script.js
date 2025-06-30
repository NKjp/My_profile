document.addEventListener('DOMContentLoaded', function () {
	$("#ytPlayer").YTPlayer();
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlaying, ytStop, ytPlay;
const ytData = [
	{
		id: 'S3x9xVTaST8',
		area: 'constant_moderate'
	},
	{
		id: 'VcMpBLdlSb8',
		area: 'aoharu'
	},
	{
		id: 'bhABIic1K44',
		area: 'unwelcome_school'
	},
	{
		id: 'X6-HDdn79zQ',
		area: 'luminous_memory'
	},
	{
		id: 'BeHbczSIXF0',
		area: 'kirisame'
	},
	{
		id: 'DQbyXNZynX4',
		area: 'endless_carnival'
	},
	{
		id: 'Q7ND_1u2mcM',
		area: 're_aoharu'
	},
	{
		id: 'UV_FMPjjrNg',
		area: 'goal_wo_nerae'
	},
	{
		id: 'OGTk9bExsII',
		area: 'dotabata'
	},
	{
		id: 'dFcDgrYuA9A',
		area: 'symphony'
	},
	{
		id: 'eJ29pmFsSwY',
		area: 'encore'
	},
	{
		id: '0KFPtliRn_4',
		area: 'teaser'
	},
	{
		id: '4rDOsvzTicY',
		area: 'forth'
	},
	{
		id: 'MzypEXT7eMQ',
		area: 'animePV'
	},
	{
		id: 'qKSl0DiIA5I',
		area: 'arona'
	},
	{
		id: 'a_stK_fFXQI',
		area: 'short'
	},
	{
		id: '1hzCHEhbzr0',
		area: 'mad'
	},
	{
		id: 'JDuWOF68M5s',
		area: 'dj1',
		start: 14400,
		end: 20054
	},
	{
		id: 'QA1ZLpkcaZ8',
		area: 'dj2',
		start: 14401,
		end: 20044
	}
]

//playerの位置情報をytDataと同じ位置にして管理
const players = new Array(ytData.length);
function onYouTubeIframeAPIReady(){
	for (let n = 0; n < ytData.length; n++) {
		//動画のサムネイル画像を取得
		document.getElementById(ytData[n]['area']).innerHTML += '<img id="ytThumb' + n + '" src="https://img.youtube.com/vi/' + ytData[n]['id'] + '/maxresdefault.jpg" alt="YouTubeの動画のサムネイル">';
		embedYoutube(n);
	}
}
function embedYoutube(num) {
	document.getElementById('ytThumb' + num).addEventListener('click', function(){
		let player;
		if (num < ytData.length - 8){
			// クリックされたサムネイルに対応するYouTubeプレーヤーを生成
			player = new YT.Player(ytData[num]['area'],{
				videoId: ytData[num]['id'],
				playerVars: {
					'rel': 0,
					'fs': 0,
					'modestbranding': 1
				},
				events:{
					'onStateChange': function(event){
						// YouTubeプレーヤーの状態が変化したときの処理を設定
						handleStateChange(event, num);
					}
				}
			});
		}else if (num >= ytData.length - 3){
			player = new YT.Player(ytData[num]['area'],{
				videoId: ytData[num]['id'],
				playerVars: {
					'rel': 0,
					'modestbranding': 1,
					'start': ytData[num]['start'],
					'end': ytData[num]['end'],
				},
				events:{
					'onStateChange': function(event){
						// YouTubeプレーヤーの状態が変化したときの処理を設定
						handleStateChange(event, num);
					}
				}
			});
		}else {
			player = new YT.Player(ytData[num]['area'],{
				videoId: ytData[num]['id'],
				playerVars: {
					'rel': 0,
					'modestbranding': 1
				},
				events:{
					'onStateChange': function(event){
						// YouTubeプレーヤーの状態が変化したときの処理を設定
						handleStateChange(event, num);
					}
				}
			});
		}
		// 生成されたYouTubeプレーヤーを配列に追加
		players[num] = player;
	});
}

function handleStateChange(event, playerIndex) {
	let thisState = players[playerIndex].getPlayerState();

	if (thisState === 1 && typeof ytPlaying === 'undefined') { // 初回再生時
		ytPlaying = playerIndex;
	} else if (thisState === 1 && ytPlaying !== playerIndex) { // 他が再生されてる時
		ytStop = ytPlaying;
		ytPlay = playerIndex;
	}

	// 同時再生があった場合、元々再生していた方を停止する
	if (typeof ytStop !== 'undefined' && ytStop !== '') {
		players[ytStop].pauseVideo();
		ytStop = '';
	}

	// 現在再生中のプレーヤー番号を保存しておく
	if (typeof ytPlay !== 'undefined' && ytPlay !== '') {
		ytPlaying = ytPlay;
		ytPlay = '';
	}
}