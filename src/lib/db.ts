import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global cache to preserve the connection across hot reloads in development.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If the connection is already established, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is pending, await it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // You can add additional Mongoose options here
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

export default dbConnect;
