export const POST_BASE_ENDPOINT="/post";

//endpoint to create a post
export const CREATE_POST_ENDPOINT = "/:user_id";

//endpoint to get all the posts
export const GET_ALL_POSTS_ENDPOINT = "/all";

//endpoint to get the post by id of a particular user
export const GET_USER_POSTS_BY_ID = "/:id/userpost";

// endpoint to get contribution count of a user
export const GET_CONTRIBUTION_COUNT_BY_ID = "/:userId/contributions";

//endpoint to get the like post by an id
export const LIKE_POST_BY_ID = "/:user_id/like";

//endpoint to get the dislike post by an id
export const DISLIKE_POST_BY_ID = "/:user_id/dislike";

//endpoint to get the like post by an id
export const CREATE_COMMENTS_BY_ID = "/:_id/comment";

//endpoint to get the COMMENTS by an id
export const GET_COMMENTS_BY_ID = "/:_id/comments";

//endpoint to delete post by an id
export const DELETE_POST_BY_ID = "/:postId";

//endpoint to get the bookmark/save post by an id
export const BOOKMARK_POST_BY_ID = "/:user_id/bookmark";

//endpoitn for updating the post
export const UPDATE_POST_BY_ID="/:user_id"
