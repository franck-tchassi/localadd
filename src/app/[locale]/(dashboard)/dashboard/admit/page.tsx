"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MagnifyingGlassIcon, CheckCircleIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


// --- Types ---
interface PlaceResult {
  id: string;
  nom: string;
  adresse: string;
  note: number | null;
  nombreAvis: number;
  ouvertMaintenant: boolean | null;
  lienMaps: string;
  photos: { url: string }[];
}

interface PlaceDetails {
  id: string;
  nom: string;
  adresse: string;
  latitude: number;
  longitude: number;
  photos: { url: string }[];
  pays: string;
  langue: string;
}

interface KeywordAnalysis {
  keyword: string;
  position: number;
  visibility: number; // en %
  difficulty: number; // 1-10
  competitors: {
    name: string;
    address: string;
    rating: number;
    position: number;
  }[];
}

// --- Barre des étapes ---
function StepBar({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  const steps = [
    { id: 1, label: "Localisation", icon: <MapPinIcon className="w-5 h-5" /> },
    { id: 2, label: "Mots-clés", icon: <TagIcon className="w-5 h-5" /> },
    { id: 3, label: "Confirmation", icon: <CheckCircleIcon className="w-5 h-5" /> },
  ];

  return (
    <nav className="max-w-4xl mx-auto mb-8">
      <ol className="flex items-center w-full">
        {steps.map(({ id, label, icon }, index) => (
          <li 
            key={id}
            className={`flex items-center ${index < steps.length - 1 ? 'w-full' : ''}`}
          >
            <button
              onClick={() => setStep(id)}
              className={`flex flex-col items-center ${step >= id ? 'text-orange-600' : 'text-gray-400'}`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= id ? 'bg-orange-100' : 'bg-gray-100'}`}>
                {icon}
              </div>
              <span className={`mt-2 text-sm font-medium ${step >= id ? 'text-orange-600' : 'text-gray-500'}`}>
                {label}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-full h-0.5 mx-2 ${step > id ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// --- Composant principal ---
export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Recherche d'établissements
  const { 
    data: results, 
    isPending: isSearching,
    error: searchError,
    mutate: searchPlaces 
  } = useMutation({
    mutationFn: async (searchQuery: string) => {
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error("Erreur lors de la recherche");
      return res.json();
    }
  });

  // Détails d'un établissement
  const { 
    data: selectedPlace, 
    isPending: isLoadingDetails,
    mutate: getPlaceDetails 
  } = useMutation({
    mutationFn: async (placeId: string) => {
      const res = await fetch(`/api/details?place_id=${placeId}`);
      if (!res.ok) throw new Error("Erreur lors du chargement des détails");
      return res.json();
    }
  });

  const suggestedKeywords = [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    searchPlaces(query);
  };

  const handleSelectPlace = (placeId: string) => {
    getPlaceDetails(placeId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <StepBar step={step} setStep={setStep} />

      {/* Étape 1 - Localisation */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedPlace ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Votre établissement</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {selectedPlace.photos[0] && (
                    <img
                      src={selectedPlace.photos[0].url}
                      alt={selectedPlace.nom}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  )}
                  <h3 className="text-lg font-medium">{selectedPlace.nom}</h3>
                  <p className="text-gray-600 flex items-start">
                    <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    {selectedPlace.adresse}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="h-48 overflow-hidden rounded-lg bg-gray-100">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&q=${selectedPlace.latitude},${selectedPlace.longitude}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                      <input
                        type="text"
                        value={selectedPlace.pays}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                      <input
                        type="text"
                        value={selectedPlace.langue}
                        className="w-full border px-3 py-2 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  onClick={() => setStep(2)}
                >
                  Continuer vers les mots-clés →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Trouvez votre établissement</h2>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nom de votre établissement, adresse..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                    disabled={isSearching}
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    {isSearching ? "Recherche..." : "Rechercher"}
                  </button>
                </div>
              </form>

              {searchError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {(searchError as Error).message}
                </div>
              )}

              <div className="space-y-3">
                {results?.map((place: PlaceResult) => (
                  <div
                    key={place.id}
                    className={`p-4 flex gap-8 border rounded-lg cursor-pointer transition-colors ${isLoadingDetails ? 'opacity-50' : 'hover:bg-orange-50 hover:border-orange-200'}`}
                    onClick={() => !isLoadingDetails && handleSelectPlace(place.id)}
                  >
                    {place.photos[0] && (
                      <img
                        src={place.photos[0].url}
                        alt={place.nom}
                        className="w-28 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                      />
                    )}
                    <div className="">
                      <h3 className="font-medium">{place.nom}</h3>
                      <p className="text-sm text-gray-600">{place.adresse}</p>
                      {place.note && (
                        <div className="flex items-center mt-2 text-sm">
                          <span className="text-orange-600 font-medium">{place.note.toFixed(1)}</span>
                          <span className="text-gray-500 ml-1">({place.nombreAvis} avis)</span>
                          {place.ouvertMaintenant !== null && (
                            <span className={`ml-3 px-2 py-0.5 rounded text-xs ${place.ouvertMaintenant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {place.ouvertMaintenant ? 'Ouvert' : 'Fermé'}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Étape 2 - Mots-clés */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold">Ajoutez vos mots-clés</h2>
          <p className="text-gray-600">Décrivez vos services pour aider les clients à vous trouver</p>
          
          <div className="space-y-4">
  <div className="flex gap-2">
    <input
      type="text"
      value={keywordInput}
      onChange={(e) => setKeywordInput(e.target.value)}
      placeholder="Saisissez un mot-clé (ex: Plombier Paris)"
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    />
    <button
      type="button"
      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      onClick={() => {
        if (keywordInput.trim()) {
          setSelectedKeywords(prev => [...prev, keywordInput.trim()]);
          setKeywordInput('');
        }
      }}
    >
      Ajouter
    </button>
  </div>

  {selectedKeywords.length > 0 && (
    <div className="space-y-4">
      <h3 className="font-medium">Vos mots-clés sélectionnés</h3>
      <div className="flex flex-wrap gap-2">
        {selectedKeywords.map((keyword, index) => (
          <div key={index} className="group relative">
            <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full">
              <span>{keyword}</span>
              <button
                type="button"
                className="ml-2 text-orange-600 hover:text-orange-800"
                onClick={() => setSelectedKeywords(prev => prev.filter((_, i) => i !== index))}
              >
                &times;
              </button>
            </div>
            <Link 
              href={`/dashboard/analysis?keyword=${encodeURIComponent(keyword)}&placeId=${selectedPlace?.id}`}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="sr-only">Analyser ce mot-clé</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

          <div className="flex justify-between pt-4">
            <button
              className="px-6 py-3 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
              onClick={() => setStep(1)}
            >
              ← Retour
            </button>
            <button
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              onClick={() => setStep(3)}
            >
              Continuer vers la confirmation →
            </button>
          </div>
        </div>
      )}

      {/* Étape 3 - Confirmation */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold">Confirmez votre profil</h2>
          
          <div className="space-y-8">
            <div className="border-b pb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-orange-600" />
                Localisation
              </h3>
              {selectedPlace && (
                <div className="pl-7">
                  <p className="font-medium">{selectedPlace.nom}</p>
                  <p className="text-gray-600">{selectedPlace.adresse}</p>
                </div>
              )}
            </div>

            <div className="border-b pb-6">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <TagIcon className="w-5 h-5 mr-2 text-orange-600" />
                Mots-clés
              </h3>
              <div className="pl-7 flex flex-wrap gap-2">
                {selectedKeywords.length > 0 ? (
                  selectedKeywords.map((keyword, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun mot-clé sélectionné</p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                className="px-6 py-3 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={() => setStep(2)}
              >
                ← Retour
              </button>
              <button
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Terminer la configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}