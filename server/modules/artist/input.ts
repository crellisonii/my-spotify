import { Field, InputType } from "type-graphql";


@InputType()
export class TopTracksInput {
    @Field()
    id: string;
    @Field({ defaultValue: 'US'})
    country: string;
}

@InputType()
export class ArtistInput{
    @Field()
    id: string;
    @Field({ nullable: true })
    includeGroups?: string;
    @Field({ nullable: true })
    country?: string;
}