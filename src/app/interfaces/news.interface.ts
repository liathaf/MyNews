import { Article } from './article.interface'

export interface News {
    status: string,
    totalResults: number,
    articles: Article[]
}

