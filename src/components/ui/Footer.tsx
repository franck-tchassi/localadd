import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-orange-500 text-white pt-10 pb-4 mt-16">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo au-dessus de la navigation */}
                <div className="flex flex-col items-center gap-4 md:col-span-1">
                    
                    <span className="font-bold text-2xl">LocalAdd</span>
                </div>
                {/* Navigation principale */}
                <div>
                    <h4 className="font-semibold mb-2">Navigation</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="/tarifs" className="hover:underline">
                                Tarifs
                            </a>
                        </li>
                        <li>
                            <a href="#testimonials" className="hover:underline">
                                Témoignages client
                            </a>
                        </li>
                        <li>
                            <a href="#nouveautes" className="hover:underline">
                                Nouveautés
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Assistance */}
                <div>
                    <h4 className="font-semibold mb-2">Assistance</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#aide" className="hover:underline">
                                Centre d’aide
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Entreprise */}
                <div>
                    <h4 className="font-semibold mb-2">Entreprise</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#apropos" className="hover:underline">
                                À propos
                            </a>
                        </li>
                        <li>
                            <a href="#carriere" className="hover:underline">
                                Carrière
                            </a>
                        </li>
                        <li>
                            <a href="#partenaire" className="hover:underline">
                                Partenaire TPE/PME
                            </a>
                        </li>
                        <li>
                            <a href="#enseignes" className="hover:underline">
                                Partenaires Enseignes
                            </a>
                        </li>
                    </ul>
                </div>
                {/* Mentions & Réseaux */}
                <div>
                    <h4 className="font-semibold mb-2">Mentions & Réseaux</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#mentions" className="hover:underline">
                                Mentions légales
                            </a>
                        </li>
                        <li>
                            <a href="#confidentialite" className="hover:underline">
                                Politique de confidentialité
                            </a>
                        </li>
                        <li className="mt-2">Suivez-nous :</li>
                        <li className="flex gap-3 mt-1">
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener"
                                aria-label="Youtube"
                                className="hover:underline"
                            >
                                Youtube
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener"
                                aria-label="Linkedin"
                                className="hover:underline"
                            >
                                Linkedin
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener"
                                aria-label="Instagram"
                                className="hover:underline"
                            >
                                Instagram
                            </a>
                        </li>
                    </ul>
                    <div className="mt-4">
                        <span className="font-semibold">Langues :</span>
                        <span className="ml-2">Français | Anglais | Italien | Espagnol</span>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 mt-8 text-xs text-center opacity-80">
                © 2025 LocalAdd. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;