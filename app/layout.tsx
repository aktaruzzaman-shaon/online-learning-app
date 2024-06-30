import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "../providers/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online learning app",
  description: "Onlien learning app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


