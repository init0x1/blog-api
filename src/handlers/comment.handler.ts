import { Request, Response } from 'express'
import { CommentModel } from '../models/comment.model'
import { Comment } from '../types/CommentTypes'

const commentModel = new CommentModel()

//create Comment
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment: Comment = {
      post_id: req.body.post_id as string,
      user_id: req.body.user_id as string,
      comment_content: req.body.comment_content as string
    }
    if (!comment.post_id || !comment.user_id || !comment.comment_content) {
      res
        .status(400)
        .json({ message: 'Missing required fields: post_id ,user_id, comment_content' })
      return
    }
    const CreatedComment: Comment = await commentModel.addComment(comment)
    res.status(200).json({ commentAdded: CreatedComment })
  } catch (error) {
    res.status(400).json({ error: 'Error while creating comment' })
  }
}

//getPostCommentsByPost
export const getPostComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const post_id = req.params.post_id as string
    if (!post_id) {
      res.status(400).json('Invalid post_id')
      return
    }
    const PostComments: Comment[] = await commentModel.getPostCommentsByPost(post_id as string)
    if (!PostComments.length) {
      res.status(404).json({ error: `there is no comments for this Post ${post_id}` })
      return
    }
    res.status(200).json({ PostComments })
  } catch (error) {
    res.status(400).json({ error: 'Error While Getting Comments of this Post' })
  }
}

//getCommentsByUser
export const getUserComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.params.user_id as string
    if (!user_id) {
      res.status(400).json('Invalid User Id')
      return
    }
    const UserComments: Comment[] = await commentModel.getCommentsByUser(user_id as string)
    if (!UserComments.length) {
      res.status(404).json(`There are No Comment by This User with id ${user_id}`)
      return
    }
    res.status(200).json({ UserComments })
  } catch (error) {
    res.status(400).json({ error: 'Error While Getting Comments of this user' })
  }
}

//getComment
export const getComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment_id = req.params.comment_id as string
    if (!comment_id) {
      res.status(400).json({ error: 'Comment ID is required' })
      return
    }
    const Comment: Comment = await commentModel.getComment(comment_id as string)
    if (!Comment) {
      res.status(400).json({ error: `there is no Comment  ${comment_id}` })
      return
    }
    res.status(200).json({ Comment })
  } catch (error) {
    res.status(400).json({ error: 'Error While Getting Comment ' })
  }
}

//update Comment
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment: Comment = {
      comment_id: req.params.comment_id as string,
      comment_content: req.body.comment_content as string,
      post_id: req.body.post_id as string,
      user_id: req.body.user_id as string
    }

    if (!comment.comment_id || !comment.comment_content) {
      res.status(400).json({ error: 'Missing required fields:comment_id and comment_content' })
      return
    }
    const existingComment = await commentModel.getComment(comment.comment_id as string)
    if (!existingComment) {
      res.status(404).json({ error: 'Comment Not Found' })
      return
    }
    const updatedComment = await commentModel.update(comment)
    res.status(200).json({ updated: updatedComment })
  } catch (error) {
    res.status(400).json({ error: 'Error While Updating Comment' })
  }
}

//Delete Comment

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment_id = req.params.comment_id as string
    if (!comment_id) {
      res.status(400).json({ error: 'comment_id  required' })
      return
    }
    if (!(await commentModel.getComment(comment_id as string))) {
      res.status(404).json({ error: 'Comment Not Found' })
      return
    }
    const deletedComment = await commentModel.delete(comment_id as string)
    res.status(200).json({ deleted: deletedComment })
  } catch (error) {
    res.status(400).json({ error: 'Error While deleting Comment' })
  }
}
