import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Search, SearchInput } from '.'
import request from 'request-promise';
import { baseUrl } from '../../constants';
import { GraphQLContext } from "../../interfaces";


@Resolver()
export class SearchResolver {

    searchUrl = 'search/';

    @Query(returns => Search)
    async search(
        @Ctx() context: GraphQLContext,
        @Arg("input") input: SearchInput
        ): Promise<Search> {
        try {
            console.log('Search String: ', input.searchString);
            console.log('Type String: ', input.typeString);
            const encoded = encodeURI(input.searchString);
            console.log('Encoded search string: ', encoded);
            const url = `${baseUrl}${this.searchUrl}`;
            const parameters = `?q=${encoded}&type=${input.typeString}&market=${input.market}`;
            const pagination = `&limit=${input.paging.limit}&offset=${input.paging.offset}`;
            const options = {
                url: `${url}${parameters}${pagination}`,
                method: 'GET',
                headers: {
                    Authorization: context.token
                }
            };
            console.log('options: ' + options);
            const resp = await request(options);
            return JSON.parse(resp);
        }
        catch (e) {
            console.log('Error: ' + e);
            throw new Error(e);
        }
    }
}