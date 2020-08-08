import { Field, Int, InputType } from 'type-graphql';

@InputType()
export class PagingInput {
    @Field(type => Int, { description: 'The maximum number of items to return.'})
    limit: number;
    @Field(type => Int, { description: 'The index of the first item to return.'})
    offset: number;
}