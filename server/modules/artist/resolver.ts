import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Artist, ArtistInput, Artist_Object, TopTracksInput } from ".";
import { Paging_Albums_Simple, PagingInput } from "../paging";
import { Track_Object } from '../track';
import request from 'request-promise';
import { baseUrl } from '../../constants';
import { GraphQLContext } from "../../interfaces";


@Resolver()
export class ArtistResolver {

    artistUrl = 'artists/';

    @Query(returns => Artist)
    async getArtist(
        @Ctx() context: GraphQLContext,
        @Arg("artistInput") input: ArtistInput
        ): Promise<Artist> {
        try {
            console.log('Artist input: ', input);
            const options = {
                url: `${baseUrl}${this.artistUrl}${input.id}`,
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

    @Query(returns => Paging_Albums_Simple)
    async getArtistAlbums(
        @Ctx() context: GraphQLContext,
        @Arg("artistInput") input: ArtistInput,
        @Arg("paging") paging: PagingInput
        ): Promise<Paging_Albums_Simple> {
        try {
            console.log('Artist input: ', input);
            console.log('Paging input: ', paging);
            const url = `${baseUrl}${this.artistUrl}${input.id}/albums`;
            const parameters = `?limit=${paging.limit}&offset=${paging.offset}`;
            const country = input.country ? `&country=${input.country}` : '';
            const includeGroups = input.includeGroups ? `&include_groups=${input.includeGroups}` : '';
            const options = {
                url: `${url}${parameters}${country}${includeGroups}`,
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

    @Query(returns => Track_Object)
    async getArtistTopTracks(
        @Ctx() context: GraphQLContext,
        @Arg("topTrackInput") input: TopTracksInput
        ): Promise<Track_Object> {
        try {
            console.log('Artist input: ', input);
            const url = `${baseUrl}${this.artistUrl}${input.id}/top-tracks`;
            const country = `?country=${input.country}`;
            const options = {
                url: `${url}${country}`,
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

    @Query(returns => Artist_Object)
    async getArtistRelatedArtists(
        @Ctx() context: GraphQLContext,
        @Arg("artistInput") input: ArtistInput
        ): Promise<Artist_Object> {
        try {
            console.log('Artist input: ', input);
            const options = {
                url: `${baseUrl}${this.artistUrl}${input.id}/related-artists`,
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

    @Query(returns => Artist_Object)
    async getArtistList(
        @Ctx() context: GraphQLContext,
        @Arg("artistInput") input: ArtistInput
        ): Promise<Artist_Object> {
        try {
            console.log('Artist input: ', input);
            const url = `${baseUrl}${this.artistUrl}?ids=${input.id}`;
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
            console.log('Error: ', e);
            throw new Error(e);
        }
    }
}