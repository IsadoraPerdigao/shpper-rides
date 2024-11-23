export interface CreateRideResponseDto {
    origin: {
        latitude: number;
        longitude: number;
    },
    destination: {
        latitude: number;
        longitude: number;
    },
    distance: number;
    duration: string;
    options: {
        id: number;
        name: string;
        description: string;
        car: string;
        review: {
            rating: number;
            comment: string;
            },
        value?: number;
    }[]
    ,
    routeResponse: object;
}