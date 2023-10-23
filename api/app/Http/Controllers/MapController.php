<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MapController extends Controller
{
    /**
     * @param Request $request
     * @return string
     */
    public function searchMap(Request $request): string
    {
        $keyword = $request->input('keyword');
        $url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%20".$keyword."&key=".env('GOOGLE_API_KEY');
        $response = Http::get($url);

        return $response->body();
    }

    /**
     * @param string $PlaceID
     * @return string
     */
    public function getByPlaceID(string $PlaceID): string
    {
        $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".$PlaceID."&key=".env('GOOGLE_API_KEY');
        $response = Http::get($url);

        return $response->body();
    }
}
