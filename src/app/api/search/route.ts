// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { PlaceSearchResult } from '../../../../types/place';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    // Validation de la requête
    if (!query) {
      return NextResponse.json(
        { error: 'Le paramètre "query" est requis' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Appel à l'API Google Places
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=fr`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Erreur Google Places:', data.status, data.error_message);
      return NextResponse.json(
        { 
          error: 'Erreur lors de la recherche',
          details: data.error_message || data.status 
        },
        { status: 502 }
      );
    }

    // Formatage des résultats
    const results: PlaceSearchResult[] = data.results.map((place: any) => ({
      id: place.place_id,
      nom: place.name,
      adresse: place.formatted_address,
      position: {
        lat: place.geometry?.location?.lat || 0,
        lng: place.geometry?.location?.lng || 0
      },
      note: place.rating ?? null,
      nombreAvis: place.user_ratings_total ?? 0,
      ouvertMaintenant: place.opening_hours?.open_now ?? null,
      photos: place.photos?.map((photo: any) => ({
        reference: photo.photo_reference,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
      })) || [],
      lienMaps: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    }));

    return NextResponse.json(results);

  } catch (error) {
    console.error('Erreur dans /api/search:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}