import { getUser } from '../../../helpers';
import uuidBase62 from 'uuid-base62';

export default async function user(root, { id }, { ctx }, info) {
  // Convert base62 back to base16
  id = uuidBase62.decode(id);

  return getUser(id);
}
