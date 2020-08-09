import { Field, Int, ObjectType } from "type-graphql";
import { Album,
    Album_Simple,
    Artist,
    Artist_Simple,
    Category,
    Paging,
    Track,
    Track_Simple
} from '..';


@ObjectType()
class Paging {
    @Field(type => String)
    href: string;
    @Field(type => Int)
    limit: number;
    @Field(type => String, { nullable: true })
    next: string;
    @Field(type => Int)
    offset: number;
    @Field(type => String, { nullable: true })
    previous: string;
    @Field(type => Int)
    total: number;
}

@ObjectType()
export class Paging_Tracks extends Paging {
    @Field(type => [Track])
    items: Track[];
}

@ObjectType()
export class Paging_Tracks_Simple extends Paging {
    @Field(type => [Track_Simple])
    items: Track_Simple[];
}

@ObjectType()
export class Paging_Albums extends Paging {
    @Field(type => [Album])
    items: Album[];
}

@ObjectType()
export class Paging_Albums_Simple extends Paging {
    @Field(type => [Album_Simple])
    items: Album_Simple[];
}

@ObjectType()
export class Paging_Artists extends Paging {
    @Field(type => [Artist])
    items: Artist[];
}

@ObjectType()
export class Paging_Artists_Simple extends Paging {
    @Field(type => [Artist_Simple])
    items: Artist_Simple[];
}

@ObjectType()
export class Paging_Category extends Paging {
    @Field(type => [Category])
    items: Category[];
}