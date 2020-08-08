import { Field, Int, ObjectType } from "type-graphql";
import { Follower, Image, Paging_Artists } from '..';


@ObjectType()
export class Artist {
    @Field(type => Follower, { nullable: true })
    followers: Follower;
    @Field(type => [String], { nullable: true })
    genres: string[];
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => [Image], { nullable: true })
    images: Image[];
    @Field(type => String)
    name: string;
    @Field(type => Int)
    popularity: number;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
}

@ObjectType()
export class Artist_Simple {
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => String)
    name: string;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
}

@ObjectType()
export class Artist_Object {
    @Field(type => [Artist])
    artists: Artist[];
}

@ObjectType()
export class Artist_Simple_Object {
    @Field(type => [Artist_Simple])
    artists: Artist_Simple[];
}

@ObjectType()
export class Artists_Paged {
    @Field(type => Paging_Artists)
    artists: Paging_Artists;
}