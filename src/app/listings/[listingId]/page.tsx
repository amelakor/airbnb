import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface Iparams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
    const listing = await getListingById(params);
    const resevations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return <EmptyState />;
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
                reservations={resevations}
            />
        </ClientOnly>
    );
};

export default ListingPage;
