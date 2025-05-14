class AuthorDto {
    id: string;
    name: string;
}

export class CommentResponseDto {
    id: string;
    text: string;
    createdAt: Date;
    author: AuthorDto;
    children?: CommentResponseDto[] | null;
}
