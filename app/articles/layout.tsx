export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-grow">{children}</div>;
}
