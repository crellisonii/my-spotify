import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
export class Image {
    @Field(type => Int, { nullable: true })
    height: number;
    @Field(type => String)
    url: string;
    @Field(type => Int, { nullable: true })
    width: number;
}