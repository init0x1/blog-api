import Client from "../database";
import { Comment } from "../types/CommentTypes";

class CommentModel{

    //insert Comment into Post
    async addComment(comment:Comment):Promise<Comment>{
        try {
            const connection = await Client.connect()
            const sqlQuery = `INSERT INTO comments (post_id, user_id, comment_content) VALUES ($1, $2, $3) RETURNING *;`
            const queryResult = await connection.query(sqlQuery,[comment.post_id,comment.user_id,comment.comment_content])
            connection.release()
            return queryResult.rows[0]
        } catch (error) {
            throw new Error(`Error while Adding Comment on post: ${comment.post_id}: ${error}`)
        }
    }

    //get Comment By Post_id => get post with its comments
    async getPostCommentsByPost(post_id:string):Promise<Comment[]>{
        try {
            const connection = await Client.connect()
            const sqlQuery=`SELECT * FROM comments WHERE post_id=$1;`
            const queryResult = await connection.query(sqlQuery, [post_id])
            connection.release()
            return queryResult.rows
        } catch (error) {
            throw new Error(`Error while retrieving comments on Post ${post_id}: ${error}`)
        }
    }

    // Get comments by user ID
  async getCommentsByUser(user_id: string): Promise<Comment[]> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT * FROM comments WHERE user_id = $1;`
      const queryResult = await connection.query(sqlQuery, [user_id])
      connection.release()
      return queryResult.rows
    } catch (error) {
      throw new Error(`Error while retrieving comments by User ${user_id}: ${error}`)
    }
  }

  // Get comments by it is ID
  async getComment(comment_id: string): Promise<Comment> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT * FROM comments WHERE comment_id = $1;`
      const queryResult = await connection.query(sqlQuery, [comment_id])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while retrieving comment ${comment_id}: ${error}`)
    }
  }

    // Update comment
    async update(comment: Comment): Promise<Comment> {
        try {
          const connection = await Client.connect()
          const sqlQuery = `UPDATE comments SET comment_content = $1, updated_at = NOW() WHERE comment_id = $2 RETURNING *;`
          const queryResult = await connection.query(sqlQuery, [comment.comment_content, comment.comment_id])
          connection.release()
          return queryResult.rows[0]
        } catch (error) {
          throw new Error(`Error while updating comment ${comment.comment_id}: ${error}`)
        }
      }

      // Delete comment
  async delete(comment_id: string): Promise<Comment> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`
      const queryResult = await connection.query(sqlQuery, [comment_id])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while deleting comment ${comment_id}: ${error}`)
    }
  }

}
export {CommentModel}