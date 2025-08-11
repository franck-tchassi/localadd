"use client"

import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

interface Organization {
  id: string;
  name: string;
  // Ajoutez d'autres propriétés selon votre modèle Prisma
}

function NewOrganizationForm() {
  const [organizationName, setOrganizationName] = useState("");

  const mutation = useMutation<Organization, Error, string>({
    mutationFn: async (name) => {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la création");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Gestion après succès (redirection, notification, etc.)
      alert(`Organisation "${data.name}" créée avec succès!`);
      setOrganizationName("");
    },
    onError: (error) => {
      // Gestion des erreurs (notification, etc.)
      alert(error.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!organizationName.trim()) {
      alert("Veuillez entrer un nom valide");
      return;
    }
    mutation.mutate(organizationName.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Nom de l'organisation
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          placeholder="Nom de l'organisation"
          className="w-full p-2 border rounded"
          disabled={mutation.isPending}
          required
        />
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={mutation.isPending || !organizationName.trim()}
      >
        {mutation.isPending ? "Création..." : "Créer"}
      </button>

      {mutation.isError && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}
    </form>
  );
}

export default NewOrganizationForm;