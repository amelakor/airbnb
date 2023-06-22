import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
    title: "Airbnb",
    description:
        "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
};

const font = Nunito({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    );
}
