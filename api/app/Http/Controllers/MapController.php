<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class MapController extends Controller
{
    /**
     * @param Request $request
     * @return string
     */
    public function searchMap(string $keyword): string
    {
        $response = Cache::get($keyword);

        if (is_null($response)) {
            $url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%20" . $keyword . "&key=" . env('GOOGLE_API_KEY');
            $response = Http::get($url);
            $response = $response->body();

            Cache::store('redis')->put($keyword, $response, now()->addHours(1)); // 60 Minutes
        }

        return $response;
    }

    /**
     * @param string $PlaceID
     * @return string
     */
    public function getByPlaceID(string $PlaceID): string
    {
        $response = Cache::get($PlaceID);

        if (is_null($response)) {
            $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".$PlaceID."&key=".env('GOOGLE_API_KEY');
            $response = Http::get($url);
            $response = $response->body();
            Cache::store('redis')->put($PlaceID, $response, now()->addHours(1)); // 60 Minutes
        }

        return $response;
    }
}
