interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function Layout({ children, locale }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
