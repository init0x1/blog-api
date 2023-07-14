import Client from '../database'
import { Post } from '../types/PostTypes'

class PostModel {
  //get All Posts
  async getAllPosts(): Promise<Post[]> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT * FROM posts;`
      const queryResult = await connection.query(sqlQuery)
      return queryResult.rows
    } catch (error) {
      throw new Error(`Error while getting posts: ${error}`)
    }
  }
  //get Posts by user_id
  async getPostsByUser(user_id: string): Promise<Post[]> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT * FROM posts WHERE user_id = $1;`
      const queryResult = await connection.query(sqlQuery, [user_id])
      return queryResult.rows
    } catch (error) {
      throw new Error(`Error while getting user:${user_id} posts: ${error}`)
    }
  }
  //get  Post by post_id
  async getPostByPostId(post_id: string): Promise<Post> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT * FROM posts WHERE post_id = $1;`
      const queryResult = await connection.query(sqlQuery, [post_id])
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while getting post:${post_id} ${error}`)
    }
  }
  // create post
  async create(post: Post): Promise<Post> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `INSERT INTO posts (user_id, title, post_content) VALUES ($1, $2, $3) RETURNING *;`
      const queryResult = await connection.query(sqlQuery, [
        post.user_id,
        post.title,
        post.post_content
      ])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while Creating Post: ${error}`)
    }
  }

  // update post
  async update(post: Post): Promise<Post> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `UPDATE posts SET title = $3, post_content = $4, updated_at = now() WHERE post_id = $1 AND user_id = $2 RETURNING *;`
      const queryResult = await connection.query(sqlQuery, [
        post.post_id,
        post.user_id,
        post.title,
        post.post_content
      ])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while updating post: ${post.post_id}: ${error}`)
    }
  }
  // delete post
  async delete(post_id: string): Promise<Post> {
    try {
      const connection = await Client.connect()
      const sql_query = `DELETE FROM posts WHERE post_id = $1  RETURNING * ;`
      const query_result = await connection.query(sql_query, [post_id])
      connection.release()
      return query_result.rows[0]
    } catch (error) {
      throw new Error(`Error while Deleting Post: ${post_id}: ${error}`)
    }
  }
}

export { PostModel }
