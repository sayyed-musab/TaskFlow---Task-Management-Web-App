import "./globals.css";

export const metadata = {
  title: "TaskFlow - Stay Organized, Stay Ahead",
  description: "A full-stack task management web app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
