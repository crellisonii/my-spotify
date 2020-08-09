import { Field, InputType } from "type-graphql";


@InputType()
export class BrowseInput {
    @Field({ nullable: true })
    country?: string;
    @Field({ nullable: true })
    locale?: string;
}