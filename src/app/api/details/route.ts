import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('place_id');

    if (!placeId) {
      return NextResponse.json(
        { error: 'Le paramètre "place_id" est requis' },
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

    // Appel Place Details
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=fr&fields=name,formatted_address,geometry,photo,address_component`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Erreur Google Details:', data.status, data.error_message);
      return NextResponse.json(
        { 
          error: 'Erreur lors de la récupération des détails',
          details: data.error_message || data.status 
        },
        { status: 502 }
      );
    }

    const components = data.result.address_components || [];
    const countryComp = components.find((c: any) => c.types.includes('country'));

    return NextResponse.json({
      id: placeId,
      nom: data.result.name,
      adresse: data.result.formatted_address,
      latitude: data.result.geometry?.location.lat,
      longitude: data.result.geometry?.location.lng,
      photos: data.result.photos?.map((photo: any) => ({
        reference: photo.photo_reference,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
      })) || [],
      pays: countryComp?.long_name || '',
      langue: countryComp?.short_name?.toLowerCase() || ''
    });

  } catch (error) {
    console.error('Erreur dans /api/details:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
