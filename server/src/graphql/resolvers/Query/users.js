import fs from 'fs';
import util from 'util';

const readDir = util.promisify(fs.readdir);

import { getUser, getAllUsers } from '../../../helpers';

export default async function users(root, args, { ctx }, info) {
  const files = await readDir('./data/users');
  // DONE: 3. can we accept a input variable into the graphql query to only show certain users? Maybe allowing
  //  filter by name to begin with.

  // DONE: 5. getting this list of all users is slow.  Would be really cool if it could return all the users
  //  in a more performant way.  Keeping in mind that the underlaying JSON files may get updated.
  
  let users = await getAllUsers();
  
  // get all the search fields  
  let queryFields = Object.keys(args);

  queryFields.map(key => {
    users = users.filter(user => user[key] === args[key])
  })

  return users;
}
