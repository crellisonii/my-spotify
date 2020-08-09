import { Field, Int, ObjectType } from "type-graphql";
import { Artist, Image, Paging_Albums, Paging_Albums_Simple, Paging_Tracks } from '..';


@ObjectType()
export class Album {
    @Field(type => String, { nullable: true })
    album_type: string;
    @Field(type => [Artist])
    artists: Artist[];
    @Field(type => [String], { nullable: true })
    available_markets: string[];
    @Field(type => [String], { nullable: true })
    genres: string[];
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => [Image])
    images: Image[];
    @Field(type => String)
    label: string;
    @Field(type => String)
    name: string;
    @Field(type => Int)
    popularity: number;
    @Field(type => String)
    release_date: string;
    @Field(type => String)
    release_date_precision: string;
    @Field(type => Paging_Tracks)
    tracks: Paging_Tracks;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
}

@ObjectType()
export class Album_Simple {
    @Field(type => String, { nullable: true })
    album_group: string;
    @Field(type => String, { nullable: true })
    album_type: string;
    @Field(type => [Artist])
    artists: Artist[];
    @Field(type => [String], { nullable: true })
    available_markets?: string[];
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => [Image])
    images: Image[];
    @Field(type => String)
    name: string;
    @Field(type => String)
    release_date: string;
    @Field(type => String)
    release_date_precision: string;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
}

@ObjectType()
export class Albums {
    @Field(type => [Album])
    albums: Album[];
}

@ObjectType()
export class Albums_Simple {
    @Field(type => [Album_Simple])
    albums: Album_Simple[];
}

@ObjectType()
export class Albums_Paged {
    @Field(type => Paging_Albums)
    albums: Paging_Albums;
}

@ObjectType()
export class Albums_Simple_Paged {
    @Field(type => Paging_Albums_Simple)
    albums: Paging_Albums_Simple;
}