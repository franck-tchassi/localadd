// app/api/invite/route.ts
import { prisma } from "@/db/prisma";
import { getCurrentSession } from "@/actions/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // 1. Authentification
    const session = await getCurrentSession();
    
    if (!session.user?.id) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    // 2. Validation des données
    const { orgId, email } = await req.json();
    
    if (!orgId || !email) {
      return NextResponse.json(
        { error: "orgId et email sont requis" },
        { status: 400 }
      );
    }

    // 3. Vérification des permissions (doit être ADMIN de l'org)
    const membership = await prisma.membership.findFirst({
      where: { 
        userId: session.user.id, 
        organizationId: orgId, 
        role: "ADMIN" 
      }
    });

    if (!membership) {
      return NextResponse.json(
        { error: "Non autorisé - Vous devez être administrateur" },
        { status: 403 }
      );
    }

    // 4. Recherche ou création de l'utilisateur invité
    const invitedUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { 
        email,
        passwordHash: "", // Vous devriez générer un mot de passe temporaire ou utiliser un flux d'invitation
        role: "USER" 
      }
    });

    // 5. Création du membership
    const newMembership = await prisma.membership.create({
      data: { 
        userId: invitedUser.id, 
        organizationId: orgId, 
        role: "MEMBER" 
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        },
        organization: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Ici vous devriez aussi:
    // - Envoyer un email d'invitation
    // - Générer un token d'invitation si nécessaire
    // - Gérer le cas où l'utilisateur existe déjà dans l'organisation

    return NextResponse.json({
      success: true,
      membership: newMembership
    });

  } catch (error) {
    console.error("Erreur lors de l'invitation:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
};