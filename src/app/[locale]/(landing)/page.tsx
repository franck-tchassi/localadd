"use client"

import Hero from "@/components/layout/Hero";
import React from "react";
import PartnersSection from "./sections/PartnersSection";
import { AnimatedTestimonialsDemo } from "./sections/AnimatedTestimonialsDemo";
import PresentationYoutube from "@/components/layout/PresentationYoutube";
import CallToAction from "@/components/layout/CallToAction";


import { FaMapMarkerAlt, FaUsers, FaStar, FaChartLine, FaShieldAlt, FaRegSmile } from "react-icons/fa";

const advantages = [
  {
    icon: <FaMapMarkerAlt className="h-10 w-10 text-orange-500 mb-4" />,
    title: "Visibilité locale boostée",
    desc: "Soyez visible sur Google Maps et dans les recherches locales pour attirer plus de clients dans votre zone.",
  },
  {
    icon: <FaChartLine className="h-10 w-10 text-orange-500 mb-4" />,
    title: "Statistiques avancées",
    desc: "Suivez vos performances, vos avis et votre progression grâce à des tableaux de bord clairs et interactifs.",
  },
  {
    icon: <FaUsers className="h-10 w-10 text-orange-500 mb-4" />,
    title: "Gestion simplifiée",
    desc: "Centralisez toutes vos informations et gérez vos établissements, offres et clients en un seul endroit.",
  },
  {
    icon: <FaStar className="h-10 w-10 text-orange-500 mb-4" />,
    title: "Avis clients valorisés",
    desc: "Mettez en avant vos meilleurs avis et répondez facilement pour renforcer votre réputation.",
  },
  {
    icon: <FaShieldAlt className="h-10 w-10 text-orange-500 mb-4" />,
    title: "Sécurité & confidentialité",
    desc: "Vos données sont protégées et votre vie privée respectée grâce à nos standards élevés.",
  },
  {
    icon: <FaRegSmile className="h-10 w-10 text-orange-500 mb-4" />,
    title: "Support expert & humain",
    desc: "Notre équipe vous accompagne et répond à vos questions pour maximiser vos résultats.",
  },
];

const AdvantagesSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Pourquoi choisir LocalAdd ?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {advantages.map((adv, idx) => (
          <div key={idx} className="bg-orange-50 rounded-xl p-8 shadow flex flex-col items-center hover:scale-[1.03] transition-transform duration-200">
            {adv.icon}
            <h3 className="font-semibold text-lg mb-2 text-center">{adv.title}</h3>
            <p className="text-gray-600 text-center text-base">{adv.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AdvantagesSection />
      <PartnersSection />
      <AnimatedTestimonialsDemo />
      <PresentationYoutube />
      <CallToAction />
    </div>
  );
}
