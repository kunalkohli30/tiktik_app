import { type SchemaTypeDefinition } from 'sanity'
import post from './schemas/post';
import user from './schemas/User';
import comment from './schemas/comment';
import postedBy from './schemas/postedBy';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, user, comment, postedBy],
}
