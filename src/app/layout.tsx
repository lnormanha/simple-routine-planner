import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { CommandProvider } from "@/providers/CommandProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Routine Planner",
  description: "A simple routine planner app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CommandProvider>{children}</CommandProvider>
          </ThemeProvider>

          <Toaster />
        </main>
      </body>
    </html>
  );
}
