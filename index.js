const rl = require('readline-sync');
let pgn = '';

const event = rl.question('Event: ');
pgn += `[Event "${event}"]\n`;

const site = rl.question('Site: ');
pgn += `[Site "${site}"]\n`;

const date = rl.question('Date (YYYY.MM.DD): ');
pgn += `[Date "${date}"]\n`;

const white = rl.question('White: ');
pgn += `[White "${white}"]\n`;

const black = rl.question('Black: ');
pgn += `[Black "${black}"]\n`;

const results = ['1-0', '1/2-1/2', '0-1'];
const index = rl.keyInSelect(results, 'Result');
pgn += `[Result "${results[index]}"]\n`;

const whiteElo = rl.question('White Elo: ');
pgn += `[WhiteElo "${whiteElo}"]\n`;

const blackElo = rl.question('Black Elo: ');
pgn += `[BlackElo "${blackElo}"]\n`;

const variant = rl.question('Variant (blank for Standard): ', { defaultInput: 'Standard' });
pgn += `[Variant "${variant}"]\n`;

const time = rl.question('Time control: ');
const timeArr = time.split('+').map(t => parseInt(t));
if (timeArr.length === 1) timeArr.push(0);
pgn += `[TimeControl "${60 * timeArr[0]}+${timeArr[1]}"]\n\n`;

const moves = rl.question('Moves (comma separated, comments in curly braces): ');
const moveArr = moves.split(',').map(m => m.trim());
for (let i = 0; i < moveArr.length; i += 2) pgn += `${Math.floor((i + 1) / 2) + 1}. ${moveArr[i]} ${moveArr[i + 1] === undefined ? '' : moveArr[i + 1] + ' '}`;
pgn += results[index];

const file = rl.question('File name: ');

require('fs').writeFileSync(require('path').resolve(__dirname, `./${file}.pgn`), pgn);
console.log(`\n${pgn}\n\nSaved at ${require('path').resolve(__dirname, `./${file}.pgn`)}`);
