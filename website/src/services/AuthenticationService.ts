import http from "@/http-common";

class AuthenticationService {
    login(user: []): Promise<any> {
        return http.post(`/sanctum/token`, user);
    }
}

export default new AuthenticationService();