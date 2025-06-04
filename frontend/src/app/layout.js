import "./globals.css";

export const metadata = {
  title: "Teacher Decision Support System",
  description: "SWA Calculator for Teachers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
