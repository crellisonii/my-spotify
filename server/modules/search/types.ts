import { Field, ObjectType } from "type-graphql";
import { Paging_Albums_Simple, Paging_Artists, Paging_Tracks } from '..';


@ObjectType()
export class Search {
    @Field(type => Paging_Albums_Simple, { nullable: true })
    albums: Paging_Albums_Simple;
    @Field(type => Paging_Artists, { nullable: true })
    artists: Paging_Artists;
    @Field(type => Paging_Tracks, { nullable: true })
    tracks: Paging_Tracks;
}