import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Post { 'id' : string, 'source' : string, 'fact' : string }
export interface _SERVICE {
  'addPost' : ActorMethod<[string, string], undefined>,
  'getPosts' : ActorMethod<[], Array<Post>>,
}
