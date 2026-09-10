import ContactSection from "@/components/Contact/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with the Formial Labs team for questions about your treatment, orders, or account.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactSection />;
}
