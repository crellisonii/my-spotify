import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Albums_Simple_Paged } from '../album'
import { Categories_Paged, Category} from '../category';
import { PagingInput } from '../paging';
import request from 'request-promise';
import { baseUrl } from '../../constants';
import { GraphQLContext } from "../../interfaces";


@Resolver()
export class BrowseResolver {

    browseUrl = 'browse/categories';
    newReleasesUrl = 'browse/new-releases';

    @Query(returns => Category)
    async getCategory(
        @Ctx() context: GraphQLContext,
        @Arg("categoryId") categoryId: string
    ): Promise<Category> {
        try {
            console.log("Category id: ", categoryId);
            const url = `${baseUrl}${this.browseUrl}/${categoryId}`;
            const options = {
                url: `${url}`,
                method: 'GET',
                headers: {
                    Authorization: context.token
                }
            };
            console.log('options: ', options);
            const resp = await request(options);
            return JSON.parse(resp);
        }
        catch (e) {
            console.log('Error: ' + e);
            throw new Error(e);
        }
    }

    @Query(returns => Categories_Paged)
    async getCategoryList(
        @Ctx() context: GraphQLContext,
        @Arg("paging") paging: PagingInput
    ): Promise<Categories_Paged> {
        try {
            const url = `${baseUrl}${this.browseUrl}`;
            const parameters = `?limit=${paging.limit}&offset=${paging.offset}`;
            const options = {
                url: `${url}${parameters}`,
                method: 'GET',
                headers: {
                    Authorization: context.token
                }
            };
            console.log('options:', options);
            const resp = await request(options);
            return JSON.parse(resp);
        }
        catch (e) {
            console.log('Error: ', e);
            throw new Error(e);
        }
    }

    @Query(returns => Albums_Simple_Paged)
    async getNewReleases(
        @Ctx() context: GraphQLContext,
        @Arg("country", { defaultValue: 'US' }) country: string,
        @Arg("paging") paging: PagingInput
    ): Promise<Albums_Simple_Paged> {
        try {
            const url = `${baseUrl}${this.newReleasesUrl}`;
            const parameters = `?limit=${paging.limit}&offset=${paging.offset}&country=${country}`;
            const options = {
                url: `${url}${parameters}`,
                method: 'GET',
                headers: {
                    Authorization: context.token
                }
            };
            console.log('options: ', options);
            const resp = await request(options);
            return JSON.parse(resp);
        }
        catch (e) {
            console.log('Error: ', e);
            throw new Error(e);
        }
    }
}