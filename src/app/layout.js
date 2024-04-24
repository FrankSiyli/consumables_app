import { Inter } from "next/font/google";
import "./globals.css";
import RecoilRootWrapper from "./RecoilRootWrapper";
import { DarkThemeProvider } from "./DarkThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Central storage",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DarkThemeProvider>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </DarkThemeProvider>
      </body>
    </html>
  );
}
