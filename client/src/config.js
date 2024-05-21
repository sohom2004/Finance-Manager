require('dotenv').config({ path: '../.env' });

const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

export {PUBLISHABLE_KEY};