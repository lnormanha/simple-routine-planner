import { Header } from "@/components/custom/Header";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Header />
      {children}
    </div>
  );
};
