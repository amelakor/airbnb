import prisma from "../lib/prismadb";

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            updatedAt: listing.updatedAt.toISOString(),
        }));
    } catch (err: any) {
        throw new Error(err);
    }
}
