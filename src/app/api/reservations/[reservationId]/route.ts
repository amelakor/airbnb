import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
    reservationId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.error();
    }
    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid reservation");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    userId: user.id,
                },
                {
                    listing: {
                        userId: user.id,
                    },
                },
            ],
        },
    });

    return NextResponse.json(reservation);
}
export const dynamic = "force-dynamic";
