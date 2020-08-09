import { Field, Int, ObjectType } from "type-graphql";
import {
    Album_Simple,
    Artist_Simple,
    LinkedTrack,
    Paging_Tracks,
    Paging_Tracks_Simple
} from '..';


@ObjectType()
export class Track {
    @Field(type => Album_Simple)
    album: Album_Simple;
    @Field(type => [Artist_Simple])
    artists: Artist_Simple[];
    @Field(type => [String])
    available_markets: string[];
    @Field(type => Int)
    disc_number: number;
    @Field(type => Int)
    duration_ms: number;
    @Field(type => Boolean)
    explicit: boolean;
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => Boolean)
    is_playable: boolean;
    @Field(type => LinkedTrack)
    linked_from: LinkedTrack;
    @Field(type => String)
    name: string;
    @Field(type => Int)
    popularity: number;
    @Field(type => String)
    preview_url: string;
    @Field(type => Int)
    track_number: number;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
    @Field(type => Boolean)
    is_local: boolean;
}

@ObjectType()
export class Track_Simple {
    @Field(type => [Artist_Simple])
    artists: Artist_Simple[];
    @Field(type => [String])
    available_markets: string[];
    @Field(type => Int)
    disc_number: number;
    @Field(type => Int)
    duration_ms: number;
    @Field(type => Boolean)
    explicit: boolean;
    @Field(type => String)
    href: string;
    @Field(type => String)
    id: string;
    @Field(type => Boolean)
    is_playable: boolean;
    @Field(type => LinkedTrack)
    linked_from: LinkedTrack;
    @Field(type => String)
    name: string;
    @Field(type => String)
    preview_url: string;
    @Field(type => Int)
    track_number: number;
    @Field(type => String)
    type: string;
    @Field(type => String)
    uri: string;
    @Field(type => Boolean)
    is_local: boolean;
}

@ObjectType()
export class Track_Object {
    @Field(type => [Track])
    tracks: Track[];
}

@ObjectType()
export class Track_Simple_Object {
    @Field(type => [Track_Simple])
    tracks: Track_Simple[];
}

@ObjectType()
export class Tracks_Paged {
    @Field(type => Paging_Tracks)
    tracks: Paging_Tracks;
}

@ObjectType()
export class Tracks_Simple_Paged {
    @Field(type => Paging_Tracks_Simple)
    tracks: Paging_Tracks_Simple;
}