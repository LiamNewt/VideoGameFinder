export interface GameSearch {
    results: GameResults[];
    count: number;
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
