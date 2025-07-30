import { NextRequest, NextResponse } from "next/server";
import { requestPasswordReset } from "@/actions/auth";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    if (!email) {
        return NextResponse.json({ success: false, error: "Email requis" }, { status: 400 });
    }
    const result = await requestPasswordReset(email);
    if (result.success) {
        // Ici, vous pouvez intégrer l'envoi d'email avec le lien contenant le token
        // Exemple de lien : `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${result.token}`
        return NextResponse.json({ success: true, token: result.token });
    }
    return NextResponse.json({ success: false, error: result.error }, { status: 404 });
}
