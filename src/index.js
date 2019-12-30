function howToPlay() {
	window.open("how2play.html","","height=450,width=680,resizable=1,scrollbars=1,status=1,left=0,top=0,left=50,top=50,screenX=20,screenY=20");
}

function sendToFriend(puzzleid) {
	console.log(puzzleid);
	if (puzzleid >= 0) {
		var url = location.href + "?puzzleID=" + puzzleid;
		document.getElementById('puzzleUrl').innerText = 'Puzzle URL: ' + url;
	}
}

var urlSearch = new URLSearchParams(window.location.search);
var puzid = urlSearch.get('puzzleID');
if(!puzid) puzid = "-1";

const aspectRatio = 615 / 510;

const embed = document.getElementById('index1071FO');
let width, height;
if (window.innerWidth > window.innerHeight) {
	height = window.innerHeight - 128;
	width = height * aspectRatio;
} else {
	width = window.innerWidth - 128;
	height = width / aspectRatio;
}
embed.setAttribute('width', width);
embed.setAttribute('height', height);
embed.setAttribute('flashvars', `mapListURL=/api/maps&addMapURL=/api/addmap&playerInfoURL=/api/players&hiScoreURL=/api/hiscores&mapVoteURL=/api/setmap&authURL=/api/authenticate&puzzleID=${puzid}`);
embed.setAttribute('src', 'media/index_1071.swf');