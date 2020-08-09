import { Field, ObjectType } from "type-graphql";
import { Image, Paging_Category } from '..';


@ObjectType()
export class Category {
    @Field(type => String)
    href: string;
    @Field(type => [Image])
    icons: Image[];
    @Field(type => String)
    id: string;
    @Field(type => String)
    name: string;
}

@ObjectType()
export class Categories {
    @Field(type => [Category])
    categories: Category[];
}

@ObjectType()
export class Categories_Paged {
    @Field(type => Paging_Category)
    categories: Paging_Category;
}