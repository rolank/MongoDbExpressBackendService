import { Post } from "../db/models/post.js";

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags });
  return await post.save();
}

async function listPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
) {
  /*The { [variable]: … } operator resolves the string stored in the variable to a key name for the
  created object. So, if our variable contains 'createdAt', the resulting object will be { createdAt: … }. 
  */
  return await Post.find(query).sort({
    [sortBy]: sortOrder === "descending" ? -1 : 1,
  });
}

export async function listAllPosts(options) {
  return await listPosts({}, options);
}

export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options);
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options);
}

export async function getPostById(postId) {
  return await Post.findById(postId);
}

export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true, runValidators: true },
  );
}
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId });
}
