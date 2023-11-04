export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Text,
    'source' : IDL.Text,
    'fact' : IDL.Text,
  });
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
