import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()
export class Follower {
    @Field(type => String, { nullable: true })
    href: string;
    @Field(type => Int)
    total: number;
}