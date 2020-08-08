import { Field, ObjectType } from "type-graphql";


@ObjectType()
export class LinkedTrack {
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
}