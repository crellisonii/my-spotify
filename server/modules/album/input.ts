import { Field, InputType } from 'type-graphql';

@InputType()
export class AlbumInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    market?: string

}