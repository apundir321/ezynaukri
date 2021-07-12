export class Autocomplete {
    public blogid: number;
    public blog_header: string;
    public blog_keywords: string;

    constructor(blogid: number
        , blog_header: string,
        blog_keywords: string) {

            this.blogid=blogid;
            this.blog_header=blog_header;
            this.blog_keywords=blog_keywords;

    }
}