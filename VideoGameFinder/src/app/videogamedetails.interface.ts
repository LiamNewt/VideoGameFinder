
export interface GameSearch {
    results: GameResults[];
    count?: number;
}

export interface GameResults {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
}

export interface GameDetails {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    metacritic: number;
    metacritic_platforms: MetaCriticPlatforms[];
    released: string;
    tba: boolean;
    updated: string;
    background_image: string;
    website: string;
    playtime: number;
    rating: number;
    rating_top: number;
    achievements_count: number;
    game_series_count: number;
    platforms: Platforms[];
    genres: GenreResults[];
    esrb_rating:{
        id:number;
        slug:string;
        name:string;
    }
}

export interface Genres{
    count: number;
    results: GenreResults[];
}

export interface GenreResults{
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface MetaCriticPlatforms{
    metascore: number;
    url: string;
    platform: {
        platform: number;
        name: string;
        slug: string;
    }
}

export interface Platforms{
    platform: Platform;
    released_at: string;
    requirements: Requirements;
}

export interface Platform{
    id: number;
    slug: string;
    name: string;
}

export interface GameStoreResponse{
    count: number;
    results: GameStore[];
}

export interface GameStore{
    id: number;
    store_id: number;
    url: string;
}

export interface StoreResponse{
    count: number;
    results: Store[];
}
export interface Store{
    id: number;
    name :string;
    slug: string;
    domain: string;
}

export interface Requirements{
    minimum: string;
    recommended: string;
}

export interface GameScreenshots{
    count: number;
    next: string;
    previous: string;
    results: Screenshot[];
}

export interface Screenshot{
    id: number;
    image: string;
    width: number;
    height: number;
}

export interface Achievements{
    count: number;
    results: Achievement[];
}
export interface Achievement{
    id: number;
    name: string;
    image: string;
    percent: string;
}

export interface WishlistGame{
    _id: string;
    gameId: number;
    name: string;
    image: string;
    rating: number;
    released: string;
}
