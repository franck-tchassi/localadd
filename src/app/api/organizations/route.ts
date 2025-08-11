// app/api/new-organization/route.ts
import { getCurrentSession } from "@/actions/auth"
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // 1. Authentification - Récupération de la session complète
    const session = await getCurrentSession();
    
    // Vérification de la session et de l'utilisateur
    if (!session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    // 2. Validation des données
    const { name } = await req.json();
    
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nom d'organisation invalide" },
        { status: 400 }
      );
    }

    // 3. Création de l'organisation
    const newOrganization = await prisma.organization.create({
      data: {
        name,
        memberships: {
          create: {
            userId: session.user.id, // Utilisation de l'ID utilisateur de la session
            role: "ADMIN"
          }
        }
      },
      include: {
        memberships: true
      }
    });

    return NextResponse.json(newOrganization);

  } catch (error) {
    console.error("Erreur création organisation:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
};