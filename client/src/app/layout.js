import "./globals.css";
import localFont from "next/font/local";

const inter = localFont({
  src: [
    // 18pt
    { path: "../../public/fonts/Inter_18pt-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Inter_18pt-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Inter_18pt-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Inter_18pt-Bold.ttf", weight: "700" },

    // 24pt
    { path: "../../public/fonts/Inter_24pt-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Inter_24pt-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Inter_24pt-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Inter_24pt-Bold.ttf", weight: "700" },

    // 28pt
    { path: "../../public/fonts/Inter_28pt-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Inter_28pt-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Inter_28pt-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Inter_28pt-Bold.ttf", weight: "700" },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
