// ==================================================
// SOCIALPLUG — SUPABASE CONNECTION
// ==================================================

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

// Initialize Supabase
const socialPlugSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Check the connection
async function checkSupabaseConnection() {
  try {
    const { data, error } =
      await socialPlugSupabase.auth.getSession();

    if (error) {
      console.error("SocialPlug connection error:", error.message);
      return false;
    }

    console.log("SocialPlug Supabase initialized successfully.");
    return true;
  } catch (error) {
    console.error("Connection failed:", error.message);
    return false;
  }
}

// Register a new user
async function registerUser(email, password) {
  const { data, error } = await socialPlugSupabase.auth.signUp({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Log in an existing user
async function loginUser(email, password) {
  const { data, error } = await socialPlugSupabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Log out
async function logoutUser() {
  const { error } = await socialPlugSupabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

// Get the current user
async function getCurrentUser() {
  const { data, error } = await socialPlugSupabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user;
}