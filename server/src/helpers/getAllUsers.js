import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);
const readDir = util.promisify(fs.readdir);

// Cache all users for faster retrieval
let allUsers = [];

export default async function getAllUsers(resetCache = false) {
  // Reset cache if the reset key word is set to true
  if (resetCache) {
    allUsers = [];
    return;
  }

  // Dont fetch new records if already cache. (Cache is cleared when an update is made)
  if (allUsers.length === 0) {
    // Read all the users
    let files = await readDir('./data/users');

    let users = files
      .filter(filename => filename.includes('.json'))
      .map(filename => readFile(`./data/users/${filename.replace('.json', '')}.json`, 'utf8'));

    users = await Promise.all(users);
    allUsers = users.map(user => JSON.parse(user));
  }

  return allUsers;
}