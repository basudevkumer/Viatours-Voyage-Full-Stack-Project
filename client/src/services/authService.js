// TODO(api): Centralize credential exchange and secure session handling here.
export async function login() { return { success: false, message: "Sign-in is not available yet.", errors: [] }; }
export async function logout() { return { success: true, message: "Signed out.", data: null }; }
export async function register() { return { success: false, message: "Account creation is not available yet.", errors: [] }; }
export async function updateProfile() { return { success: false, message: "Profile updates are not connected yet.", errors: [] }; }
