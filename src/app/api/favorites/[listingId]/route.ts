import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
    const { listingId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    if (!listingId) {
        throw new Error("Listing ID is required.");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const { listingId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    if (!listingId) {
        throw new Error("Listing ID is required.");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}

export const dynamic = "force-dynamic";
