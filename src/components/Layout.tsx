import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function Layout({ children, locale }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} />
      <Toaster />
    </div>
  );
}
