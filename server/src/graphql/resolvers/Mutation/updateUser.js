import { setUser, getUser, getAllUsers } from '../../../helpers';
import uuidBase62 from 'uuid-base62';

export default async function User(root, { user }, { ctx }, info) {
  // DONE: 1 this throws a unfriendly (and potentially unsafe) error if a non-existnant user ID is entered.
  // how can we check for a non-existing user id and throw a more friendly error.

  // Decode base62 Id back to base16
  let id = uuidBase62.decode(user.id);

  let userDetails = await getUser(id);
  
  if(user.name){
    userDetails.name = user.name;
  }

  if(user.email){
    userDetails.email = user.email;
  }
  // DONE: 2 why is this update overwriting existing user data? Need to fix this so that just data input is
  // updated rather than overwritting all the data.

  await setUser(userDetails);
  
  // Clear any user cache previous set
  await getAllUsers(true);

  return true;
}
