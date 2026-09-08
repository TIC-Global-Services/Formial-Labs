import ContainerLayout from "@/components/Reusable/ContainerLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shipping Policy",
  description:
    "Processing times, delivery estimates, tracking, and shipping restrictions for orders placed with Formial.",
  path: "/shipping-policy",
});

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-aeonik text-lg text-primary sm:text-xl">{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 text-sm leading-relaxed text-[#525252]">{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#525252]">
    {children}
  </ul>
);

const ShippingPage = () => {
  return (
    <ContainerLayout as="main" className="mx-auto max-w-3xl pt-28 pb-20 md:pt-32">
      <span className="font-obviously text-xs font-bold uppercase tracking-widest text-primary/60">
        Legal
      </span>
      <h1 className="mt-3 font-aeonik text-3xl leading-tight tracking-tighter text-primary sm:text-5xl">
        Shipping Policy
      </h1>

      <div className="mt-10 space-y-8">
        <div>
          <H2>Processing Time</H2>
          <P>
            All orders are processed within 7 business days. Orders are not
            shipped or delivered on weekends or public holidays.
          </P>
        </div>

        <div>
          <H2>Shipping Rates &amp; Delivery Estimates</H2>
          <P>We offer the following shipping options:</P>
          <UL>
            <li>Free shipping on orders over &#8377;1000</li>
          </UL>
        </div>

        <div>
          <H2>Order Tracking</H2>
          <P>
            Once your order has shipped, you will receive an email
            notification with your tracking number. If you do not receive
            this you can contact customer care for your tracking details on
            WhatsApp.
          </P>
        </div>

        <div>
          <H2>Shipping Restrictions</H2>
          <P>
            We currently ship only within India to postcodes that are
            serviceable by common D2C shipping partners.
          </P>
        </div>

        <div>
          <H2>Delays</H2>
          <P>
            We are not responsible for delays caused by customs, natural
            disasters, or courier issues beyond our control.
          </P>
        </div>

        <div>
          <H2>Damaged or Lost Items</H2>
          <P>
            If your order arrives damaged or is lost in transit, please
            contact us at{" "}
            <a href="mailto:care@formial.in" className="font-semibold text-primary underline">
              care@formial.in
            </a>{" "}
            within 2 days of the expected delivery date.
          </P>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default ShippingPage;
