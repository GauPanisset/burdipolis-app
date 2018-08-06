const DB_NAME = 'tests-express-sqlite';
const Fs = require('fs');
const Path = require('path');
const Sqlite = require('sqlite3');

const DB = new Sqlite.Database(DB_NAME);

if(!Fs.existsSync(`./${DB_NAME}`)){
	const init = Fs.readFileSync(Path.join(process.cwd(), './data/database.sql'), 'utf-8');
	DB.exec(init);
}

module.exports = DB;
