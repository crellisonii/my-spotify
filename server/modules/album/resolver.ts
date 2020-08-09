import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Album, AlbumInput, Albums } from ".";
import { PagingInput, Paging_Tracks_Simple } from "../paging";
import request from 'request-promise';
import { baseUrl } from '../../constants';
import { GraphQLContext } from "../../interfaces";


@Resolver()
export class AlbumResolver {
  albumUrl = "albums/";

  @Query(returns => Album)
  async getAlbum(
    @Ctx() context: GraphQLContext,
    @Arg("albumInput") input: AlbumInput
  ): Promise<Album | string> {
    try {
      console.log("Album input: ", input);
      const { id, market } = input;
      const url = `${baseUrl}${this.albumUrl}${id}`;
      const options = {
        url: `${url}`,
        method: "GET",
        headers: {
          Authorization: context.token
        }
      };
      market ? Object.assign(options, { qs: { market: market }}) : '';
      console.log("options: ", options);
      const resp = await request(options);
      return JSON.parse(resp);
    } catch (e) {
      console.log("Error: ", e);
      throw new Error(e);
    }
  }

  @Query(returns => Paging_Tracks_Simple)
  async getAlbumTracks(
    @Ctx() context: GraphQLContext,
    @Arg("albumInput") input: AlbumInput,
    @Arg('pagingInput') paging: PagingInput
  ): Promise<Paging_Tracks_Simple> {
    try {
      console.log("Album input: ", input);
      console.log("Paging: ", paging);
      const { id, market } = input;
      const { limit, offset } = paging;
      const url = `${baseUrl}${this.albumUrl}${id}/tracks`;
      const qs = {
        limit: limit,
        offset: offset
      };
      market ? Object.assign(qs, { market: market }) : '';
      const options = {
        url: `${url}`,
        method: "GET",
        headers: {
          Authorization: context.token
        },
        qs: qs
      };
      console.log("options: ", options);
      const resp = await request(options);
      return JSON.parse(resp);
    } catch (e) {
      console.log("Error: ", e);
      throw new Error(e);
    }
  }

  @Query(returns => Albums)
  async getAlbumList(
    @Ctx() context: GraphQLContext,
    @Arg("albumInput") input: AlbumInput
  ): Promise<Albums> {
    try {
      const { id, market } = input;
      console.log("Album input: ", input);
      const url = `${baseUrl}${this.albumUrl}`;
      const qs = { ids: id };
      market ? Object.assign(qs, { market: market }) : '';
      const options = {
        url: `${url}`,
        method: "GET",
        headers: {
          Authorization: context.token
        },
        qs: qs
      };
      console.log("options: ", options);
      const resp = await request(options);
      return JSON.parse(resp);
    } catch (e) {
      console.log("Error: ", e);
      throw new Error(e);
    }
  }
}