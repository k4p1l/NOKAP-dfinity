export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Text,
    'source' : IDL.Text,
    'fact' : IDL.Text,
    'count' : IDL.Int,
  });
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'authUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'like' : IDL.Func([IDL.Text], [IDL.Int], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
