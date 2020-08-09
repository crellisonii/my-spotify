import { Field, InputType } from "type-graphql";
import { PagingInput } from '..';


@InputType()
export class SearchInput {
    @Field()
    searchString: string;
    @Field()
    typeString: string;
    @Field()
    paging: PagingInput;
    @Field({ defaultValue: 'US' })
    market: string;
}