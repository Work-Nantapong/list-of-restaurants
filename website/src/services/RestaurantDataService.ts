import http from "@/http-common";
import { VueCookieNext } from 'vue-cookie-next'
const config = {
    headers: {
        Authorization: `Bearer ` + VueCookieNext.getCookie('token')
    }
};

class RestaurantDataService {
    findPlease(keyword: string): Promise<any> {
        return http.get(`/restaurant/nearby_search/${keyword}`, config);
    }

    findByPlaceID(place_id: string): Promise<any> {
        return http.get(`/map_by_place_id/${place_id}`, config);
    }
}

export default new RestaurantDataService();
