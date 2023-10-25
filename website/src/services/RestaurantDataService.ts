import http from "@/http-common";

/* eslint-disable */
class RestaurantDataService {
    findPlease(keyword: string): Promise<any> {
        return http.get(`/restaurant/nearby_search/${keyword}`);
    }

    findByPlaceID(place_id: string): Promise<any> {
        return http.get(`/map_by_place_id/${place_id}`);
    }
}

export default new RestaurantDataService();