-- Create session table for authentication
CREATE TABLE IF NOT EXISTS session (
  sid varchar NOT NULL PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  price INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DOUBLE PRECISION NOT NULL,
  square_feet INTEGER NOT NULL,
  description TEXT NOT NULL,
  features TEXT[],
  status TEXT NOT NULL DEFAULT 'active',
  property_type TEXT NOT NULL,
  year_built INTEGER,
  images TEXT[],
  county TEXT,
  is_luxury BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  relationship TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  years_with_realtor INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest_in TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Create areas_served table
CREATE TABLE IF NOT EXISTS areas_served (
  id SERIAL PRIMARY KEY,
  county TEXT NOT NULL,
  cities TEXT[] NOT NULL
); 