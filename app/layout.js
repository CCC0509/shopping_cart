import Header from "@/components/header/header";
import { UseFnProvider } from "@/context/cart-data-context";

import "./globals.css";
import Footer from "@/components/footer/footer";
import ScrollHandler from "@/components/home/scroll-handler";
import NavSlider from "@/components/header/nav-slider";

export const metadata = {
  title: "壹點。甜",
  description: "美味甜點，一起享受！",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UseFnProvider>
          <ScrollHandler className="scroll_container">
            <Header />
            <NavSlider />
            {children}
            <Footer />
          </ScrollHandler>
        </UseFnProvider>
      </body>
    </html>
  );
}
