export type ArticleItem = {
    id: number,
    slug: string,
    title: string,
    description: string,
    body: string,
    created: number,
    updated: number,
    tagList: string[],
    favoriteCount: number,
    author: {
        id: 3,
        username: string,
        email: string,
        bio: string,
        image: string
    }
}

export type GetAllArticlesResponse = {
    articles: ArticleItem[],
    articlesCount: number
}

export type NewEditArticleForm = {
    slug?: string,
    title: string,
    description: string,
    body: string,
    tagList: string
}


export type NewEditArticleRequest = {
    slug?: string,
    title: string,
    description: string,
    body: string,
    tagList: string[]
}

export type CommentForm = {
    comment: string
}

export type NewCommentRequest = {
    slug: string,
    body: string
}

export type IComment = {
    id: number,
    author: {
        id: number,
        username: string,
        email: string,
        bio: string,
        image: string
    }
    body: string,
    created: number
}

export type DeleteCommentRequest = {
    slug: string,
    id: number
}