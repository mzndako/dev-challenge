import { getCompany, getAllUsers } from '../../../helpers';

export default async function company(root, { id }, { ctx }, info) {
  
  // Attach all users to the context to be used by the employee resolver
  ctx.users = await getAllUsers();

  return getCompany(id);
}
