// app/create-workspace/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Erreur de création");
      return response.json();
    },
    onSuccess: () => {
      router.push("/dashboard"); // Redirection après création
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgName.trim()) {
      mutate(orgName.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-md space-y-6 p-8 ">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-orange-600">
            Créer votre espace de travail
          </h1>
          <p className="text-gray-600">
            Les espaces de travail organisent vos profils d'entreprise. Donnez-lui un nom distinctif.
            <span className="block mt-1 text-sm text-gray-500">
              Vous pourrez le modifier ultérieurement et inviter vos collaborateurs.
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            
            <Input
              id="orgName"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Nom de l'espace de travail"
              disabled={isPending}
              required
              className="py-3 px-4 border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
              className="h-12 px-6 flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isPending || !orgName.trim()}
              className="h-12 px-6 flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors shadow-sm"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création...
                </span>
              ) : (
                "Créer l'espace"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}