import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";

interface Iparams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return <EmptyState />;
    }

    return (
        <ClientOnly>
            <ListingClient listing={listing} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default ListingPage;
