/* Replace with your SQL commands */
-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the comments table
CREATE TABLE comments (
    comment_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES posts(post_id) NOT NULL,
    user_id UUID REFERENCES users(user_id) NOT NULL,
    comment_content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);