import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Post {
  'id' : string,
  'source' : string,
  'fact' : string,
  'count' : bigint,
}
export interface _SERVICE {
  'addPost' : ActorMethod<[string, string], undefined>,
  'authUser' : ActorMethod<[string, string], string>,
  'getPosts' : ActorMethod<[], Array<Post>>,
  'like' : ActorMethod<[], bigint>,
}
