import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Track, Track_Object } from '..';
import request from 'request-promise';
import { baseUrl } from "../../constants";
import { GraphQLContext } from "../../interfaces";


@Resolver()
export class TrackResolver {

    trackUrl = 'tracks/';

    @Query(returns => Track)
    async getTrack(
        @Ctx() context: GraphQLContext,
        @Arg("trackId") trackId: string,
        @Arg("market", { defaultValue: 'US' }) market?: string
        ): Promise<Track> {
        try {
            console.log('Track id: ', trackId);
            const url = `${baseUrl}${this.trackUrl}${trackId}`;
            const parameters = `?market=${market}`;
            const options = {
                url: `${url}${parameters}`,
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

    @Query(returns => Track_Object)
    async getTrackList(
        @Ctx() context: GraphQLContext,
        @Arg("trackId") trackId: string,
        @Arg("market", { defaultValue: 'US' }) market: string
        ): Promise<Track_Object> {
        try {
            console.log('Track ids: ' + trackId);
            const url = `${baseUrl}${this.trackUrl}`;
            const parameters = `?ids=${trackId}&market=${market}`;
            const options = {
                url: `${url}${parameters}`,
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