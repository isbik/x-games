import { Footer } from "@/components/footer";
import { SiteHeader } from "@/widgets/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />

      {children}

      <Footer />
    </>
  );
}
