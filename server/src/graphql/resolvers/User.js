import { getUser, getCompany } from '../../helpers';

// todo: 5. it would be nicer to return a base62 value for the id field instead of a base16 uuid.
// ideally this would be implemented without changing the underlaying data, in a reusable way.
// Sending data to the client side should convert a base16 uuid to a base62 string, and inputting
// into the graphql api should convert a base62 string back to a base16 uuid

export default {
  friends: async (root, args, { ctx }, info) => {
    let friends = [];
    // root.friends will be an array of just user ids.

    if (root.friends) {
      // lets turn that into actual user data.
      friends = root.friends.map(id => getUser(id));
    }

    return friends;
  },
  company: async (root, args, { ctx }, info) => {
    
    if(!root.company){
      return null;
    }

    return getCompany(root.company); 
  }
};
