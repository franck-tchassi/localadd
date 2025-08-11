"use client";

import { useState, useEffect } from 'react';
import { Check, MapPin, Globe, BarChart2, Shield, Route, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FAQSection from '@/components/layout/FAQSection';
import HighlightText from '@/components/layout/HighlightText';
import { useRouter } from 'next/navigation';
import { getCurrentSession } from '@/actions/auth';

type PlanBase = {
  id: string;
  name: string;
  price: string;
  annualPrice?: string;
  period: string;
  description: string;
  cta: string;
  popular: boolean;
  features: string[];
  action: (plan?: Plan) => void;
};

type PlanPayant = PlanBase & {
  monthlyLink: string;
  annualLink: string;
  monthlyPriceId: string;
  annualPriceId: string;
};

type Plan = PlanBase | PlanPayant;

// Configuration des liens Stripe selon l'environnement
const getStripeConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';
  
  return [
    {
      monthlyLink: isDev 
        ? 'https://buy.stripe.com/test_3cI3cua5M3cc7JQ6vfc3m07' 
        : '',
      annualLink: isDev 
        ? 'https://buy.stripe.com/test_7sYbJ01zg5kkfci8Dnc3m08' 
        : '',
      monthlyPriceId: isDev ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS_MONTH : '',
      annualPriceId: isDev ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS_ANNUAL : '',
      id: 'business'
    },
    {
      monthlyLink: isDev 
        ? 'https://buy.stripe.com/test_3cIdR86TA288c068Dnc3m06' 
        : '',
      annualLink: isDev 
        ? 'https://buy.stripe.com/test_dRm9ASem2144fci7zjc3m05' 
        : '',
      monthlyPriceId: isDev ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTH : '',
      annualPriceId: isDev ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL : '',
      id: 'pro'
    }
  ];
};

export default function PricingPage() {
  const router = useRouter();
  const [session, setSession] = useState<any | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getCurrentSession();
      setSession(session);
    };
    checkAuth();
  }, []);

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/api/user/limits')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.plan) setUserPlan(data.plan.toLowerCase());
      });
  }, [isAuthenticated]);

  const stripePlans = getStripeConfig();

  const getPlanAction = (planId: string) => {
    if (!isAuthenticated) {
      return () => router.push('/auth/sign-in');
    }
    
    const stripePlan = stripePlans.find(p => p.id === planId);
    if (!stripePlan) return () => router.push('/contact');
    
    return () => window.open(
      billingCycle === 'monthly' ? stripePlan.monthlyLink : stripePlan.annualLink, 
      "_blank"
    );
  };

 const plans: Plan[] = [
  {
    ...stripePlans.find(p => p.id === 'business')!,
    name: 'Business',
    price: '35€',
    annualPrice: '420€',
    period: '/mois',
    description: 'Pour les propriétaires d\'entreprises occupés qui veulent plus de clients',
    cta: isAuthenticated ? (userPlan === 'business' ? 'Votre plan actuel' : 'Choisir ce plan') : 'Essai gratuit 14 jours',
    popular: false,
    features: [
      'Se faire trouver sur Google sans connaissance technique',
      'Démarquez-vous des concurrents',
      'Publications automatiques attirant les clients',
      'Tâches guidées pour améliorer vos classements',
      'Gestion des avis en un clic'
    ],
    action: getPlanAction('business'),
  },
  {
    ...stripePlans.find(p => p.id === 'pro')!,
    name: 'Pro',
    price: '59€',
    annualPrice: '708€',
    period: '/mois',
    description: 'Pour les agences et indépendants gérant plusieurs clients',
    cta: isAuthenticated ? (userPlan === 'pro' ? 'Votre plan actuel' : 'Choisir ce plan') : 'Essai gratuit 14 jours',
    popular: true,
    features: [
      'Gestion de 2-10 profils clients',
      'Optimisation jusqu\'à 5 profils',
      'Tableau de bord unifié',
      'Surveillance des concurrents',
      'Génération de contenu avec IA',
      'Responsable de compte dédié'
    ],
    action: getPlanAction('pro'),
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    price: 'Sur mesure',
    period: '',
    description: 'Pour les entreprises à volume élevé avec multiples localisations',
    cta: 'Contactez-nous',
    popular: false,
    features: [
      'Nombre illimité de profils',
      'Solution personnalisée',
      'Surveillance proactive',
      'Assistance prioritaire',
      'Analyses marché avancées',
      'Intégrations API'
    ],
    action: () => router.push('/contact'),
  }
]; 

  const features = [
    {
      icon: <Layers className="w-5 h-5 text-orange-500" />,
      title: "Gestion de profil",
      description: "Optimisation complète de votre profil Google Business"
    },
    {
      icon: <MapPin className="w-5 h-5 text-orange-500" />,
      title: "Visibilité locale",
      description: "Augmentation de votre visibilité dans les recherches locales"
    },
    {
      icon: <Route className="w-5 h-5 text-orange-500" />,
      title: "Analyse concurrentielle",
      description: "Surveillance et analyse de vos concurrents directs"
    },
    {
      icon: <Globe className="w-5 h-5 text-orange-500" />,
      title: "Géolocalisation multiple",
      description: "Gestion des fiches pour plusieurs emplacements"
    },
    {
      icon: <BarChart2 className="w-5 h-5 text-orange-500" />,
      title: "Analytics avancés",
      description: "Tableaux de bord détaillés et rapports de performance"
    },
    {
      icon: <Shield className="w-5 h-5 text-orange-500" />,
      title: "Gestion de réputation",
      description: "Surveillance et réponse aux avis clients"
    }
  ];

  return (
    <main className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Tarification">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Des plans adaptés à votre{' '}
            <HighlightText variant="fancy-slant" color="orange">
              entreprise
            </HighlightText>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez la formule qui correspond à vos besoins en gestion de visibilité locale
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${billingCycle === 'monthly' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Facturation mensuelle
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${billingCycle === 'annual' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Facturation annuelle (-20%)
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-orange-500 ring-2 ring-orange-200 transform hover:-translate-y-1'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-bold transform translate-x-2 -translate-y-2 rotate-6">
                  POPULAIRE
                </div>
              )}

              <div className="p-8 bg-white">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {billingCycle === 'monthly' ? plan.price : plan.annualPrice || plan.price}
                  </span>
                  {plan.id !== 'enterprise' && (
                    <span className="ml-1 text-lg text-gray-500">
                      {billingCycle === 'monthly' ? plan.period : '/an'}
                    </span>
                  )}
                </div>
                {plan.id !== 'enterprise' && billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 mb-4">Économisez 20% avec le paiement annuel</p>
                )}
                <Button
                  className={`w-full py-6 text-lg transition-all ${
                    plan.popular
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
                      : plan.id === 'enterprise'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => plan.action(plan)}
                >
                  {plan.cta}
                </Button>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Ce qui est inclus
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-gray-50 py-8 px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Comparaison des fonctionnalités
            </h2>
            <p className="mt-2 text-center text-gray-500 max-w-2xl mx-auto">
              Découvrez quelle offre correspond le mieux à vos besoins
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left w-1/3 min-w-[300px] bg-gray-50">
                    <span className="sr-only">Fonctionnalités</span>
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={index}
                      className={`py-4 px-6 text-center ${
                        plan.popular ? 'bg-orange-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">{plan.name}</span>
                        <span className="text-sm text-gray-500">
                          {billingCycle === 'monthly' ? plan.price : plan.annualPrice || plan.price}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {feature.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      {index < 4 ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-center bg-orange-50">
                      {index < 5 ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <Check className="mx-auto text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
            Tous les plans incluent un essai gratuit de 14 jours et une garantie de remboursement de 30 jours
          </div>
        </div>

        <FAQSection />
      </div>
    </main>
  );
}