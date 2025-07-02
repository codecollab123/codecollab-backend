export const USER_ENDPOINT = "/user"; // Base endpoint for user-related operations
export const USER_GOOGLE_LOGIN_ENDPOINT = "/googleLogin_user";
export const USER_ID_DETAILS_ENDPOINT = "/:user_id/profile-info";
// GET user by ID
export const GET_USER_BY_ID = "/user/id/:user_id";

export const GET_USER_BY_EMAIL = "/user_email";

// PUT - Update user info (e.g., from Edit Profile page)
export const UPDATE_USER_PROFILE = "/:user_id"; // e.g., /user/update/12345
