import Section from "@components/Section";
import Link from "next/link";
import Breadcrumb from "@components/Breadcrumb";
import PageLayout from "@components/PageLayout";
import {
  FaShieldAlt,
  FaLock,
  FaUserCheck,
  FaCookie,
  FaExchangeAlt,
  FaChild,
  FaFileContract,
  FaEnvelope,
} from "react-icons/fa";

export const metadata = {
  title: "Privacy Policy - DevsHurdle",
  description: "Privacy policy for DevsHurdle - Learn how we protect your data and privacy",
};

export default function PrivacyPage() {
  const lastUpdated = "December 28, 2025";

  const sections = [
    {
      icon: <FaShieldAlt className="text-mainColor text-2xl" />,
      title: "Information We Collect",
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            DevsHurdle collects information you provide directly to us, such as when you create an account, subscribe to
            our newsletter, or contact us for support. This may include:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Name and email address</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Account credentials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Profile information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Communications with us</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaUserCheck className="text-mainColor text-2xl" />,
      title: "How We Use Your Information",
      content: (
        <>
          <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Provide, maintain, and improve our services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Process transactions and send related information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Send technical notices and support messages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Communicate with you about products, services, and promotions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Monitor and analyze trends and usage</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaExchangeAlt className="text-mainColor text-2xl" />,
      title: "Information Sharing",
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your
            consent, except as described in this policy. We may share your information in the following situations:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>With service providers who assist us in operating our website</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>To comply with legal obligations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>To protect our rights and prevent fraud</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>In connection with a business transfer</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaLock className="text-mainColor text-2xl" />,
      title: "Data Security",
      content: (
        <p className="text-muted-foreground">
          We implement appropriate security measures to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>
      ),
    },
    {
      icon: <FaCookie className="text-mainColor text-2xl" />,
      title: "Cookies and Tracking",
      content: (
        <p className="text-muted-foreground">
          We use cookies and similar technologies to enhance your experience on our site. You can control cookie
          settings through your browser preferences.
        </p>
      ),
    },
    {
      icon: <FaFileContract className="text-mainColor text-2xl" />,
      title: "Your Rights",
      content: (
        <>
          <p className="text-muted-foreground mb-4">You have the right to:</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Access the personal information we hold about you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Correct inaccurate information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Request deletion of your information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Object to or restrict processing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Data portability</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaChild className="text-mainColor text-2xl" />,
      title: "Children's Privacy",
      content: (
        <p className="text-muted-foreground">
          Our services are not intended for children under 13. We do not knowingly collect personal information from
          children under 13.
        </p>
      ),
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-mainColor/15 to-transparent pb-8" noPadding={true}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy", href: "/privacy" },
          ]}
        />

        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-mainColor/10 rounded-full mb-6">
            <FaShieldAlt className="text-3xl text-mainColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: {lastUpdated}</p>
        </div>
      </Section>

      {/* Content Section */}
      <Section containerClassName="max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-mainColor/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground mt-2">{section.title}</h2>
              </div>
              <div className="ml-16">{section.content}</div>
            </div>
          ))}

          {/* Changes to Policy */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the
              new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-mainColor/10 to-mainColor/5 rounded-xl border border-mainColor/20 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-mainColor/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-mainColor text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Questions?</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this privacy policy, please don't hesitate to contact us.
                </p>
                <Link
                  href="mailto:contact@devshurdle.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  <FaEnvelope />
                  contact@devshurdle.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Badges Section */}
      <Section className="bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Your Data is Protected</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLock className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Storage</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and stored securely</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">GDPR Compliant</h3>
              <p className="text-sm text-muted-foreground">We follow international privacy standards</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserCheck className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">You're in Control</h3>
              <p className="text-sm text-muted-foreground">Manage your data preferences anytime</p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
