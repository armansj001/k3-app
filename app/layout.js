export const metadata = {
  title: "Aplikasi K3",
  description: "Monitoring K3"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
