type Comment ={
    comment_id? :string
    post_id :string
    user_id :string
    comment_content :string
    created_at ?:string
    updated_at ?:string
}

export{Comment}