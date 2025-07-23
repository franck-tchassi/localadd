"use client";

import React, { useState } from "react";
import { requestPasswordReset } from "@/actions/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    const res = await requestPasswordReset(email);
    setLoading(false);
    if (res.success) {
      setMessage("Un email de réinitialisation a été envoyé si l'adresse existe.");
    } else {
      setError(res.error || "Erreur lors de la demande.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">Mot de passe oublié</h2>
        <p className="mb-6 text-gray-600 text-center">Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-base"
              placeholder="Votre email"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {message && <p className="text-sm text-green-600 text-center">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border cursor-pointer border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;