import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unathorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ authorId: currentUser.id });
    console.log(reservations, "reservations");

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations"
                    subtitle="There are no reservations for this property"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations as any}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ReservationsPage;
