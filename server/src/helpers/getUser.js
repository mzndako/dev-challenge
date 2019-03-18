import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);

export default async function getUser(id) {
  let fileExists = await exists(`./data/users/${id}.json`);

  if(!fileExists){
    throw 'User does not exists';
  }
  const data = await readFile(`./data/users/${id}.json`, 'utf8');
  return JSON.parse(data);
}
