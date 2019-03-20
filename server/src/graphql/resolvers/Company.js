
export default {
  employees: async (root, args, { ctx }, info) => {
    let employees = ctx.users.filter(user => user.company === root.id)
    return employees;
  }
};
