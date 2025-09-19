import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "funtok - игры для всех",
  description:
    "Игры на доске для всех возрастов: от головоломок и логики до забавных задач и викторин. Играй на своем устройстве: на компьютере, смартфоне или планшете",
  icons: {
    icon: "favicon.svg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      </head>

      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
