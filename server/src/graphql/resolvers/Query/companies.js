import fs from 'fs';
import util from 'util';

const readDir = util.promisify(fs.readdir);

import { getCompany, getUser } from '../../../helpers';

export default async function companies(root, args, { ctx }, info) {
  // Read all the users
  let files = await readDir('./data/users');
  let users = files
    .filter(filename => filename.includes('.json'))
    .map(filename => getUser(filename.replace('.json', '')));

  files = await readDir('./data/companies');
  let companies = files
    .filter(filename => filename.includes('.json'))
    .map(filename => getCompany(filename.replace('.json', '')));
  
  // Attach all users to the context object  
  ctx.users = await Promise.all(users);
  
  
  return companies;
}
