import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { RoutineProvider } from "@/contexts/RoutineContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Routine Planner",
  description: "A simple routine planner app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RoutineProvider>{children}</RoutineProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'