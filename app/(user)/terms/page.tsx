import Section from "@components/Section";
import Link from "next/link";
import Breadcrumb from "@components/Breadcrumb";
import PageLayout from "@components/PageLayout";
import {
  FaFileContract,
  FaUserShield,
  FaKey,
  FaFileAlt,
  FaBan,
  FaCopyright,
  FaUserTimes,
  FaExclamationTriangle,
  FaBalanceScale,
  FaGavel,
  FaEnvelope,
} from "react-icons/fa";

export const metadata = {
  title: "Terms of Service - DevsHurdle",
  description: "Terms of service for DevsHurdle - Read our terms and conditions for using our platform",
};

export default function TermsPage() {
  const lastUpdated = "December 28, 2025";

  const sections = [
    {
      icon: <FaFileContract className="text-mainColor text-2xl" />,
      title: "Acceptance of Terms",
      content: (
        <p className="text-muted-foreground">
          By accessing and using DevsHurdle, you accept and agree to be bound by the terms and provision of this
          agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
      ),
    },
    {
      icon: <FaKey className="text-mainColor text-2xl" />,
      title: "Use License",
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            Permission is granted to temporarily access the materials (information or software) on DevsHurdle's website
            for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
            title, and under this license you may not:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Modify or copy the materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Use the materials for any commercial purpose or for any public display</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Attempt to decompile or reverse engineer any software contained on the website</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>Remove any copyright or other proprietary notations from the materials</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaUserShield className="text-mainColor text-2xl" />,
      title: "User Accounts",
      content: (
        <p className="text-muted-foreground">
          When you create an account with us, you must provide information that is accurate, complete, and current at
          all times. You are responsible for safeguarding the password and for all activities that occur under your
          account.
        </p>
      ),
    },
    {
      icon: <FaFileAlt className="text-mainColor text-2xl" />,
      title: "Content",
      content: (
        <p className="text-muted-foreground">
          Our service allows you to post, link, store, share and otherwise make available certain information, text,
          graphics, or other material. You are responsible for content that you post to the service, including its
          legality, reliability, and appropriateness.
        </p>
      ),
    },
    {
      icon: <FaBan className="text-mainColor text-2xl" />,
      title: "Prohibited Uses",
      content: (
        <>
          <p className="text-muted-foreground mb-4">You may not use our service:</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>For any unlawful purpose or to solicit others to perform unlawful acts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>
                To violate any international, federal, provincial, or state regulations, rules, laws, or local
                ordinances
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>
                To infringe upon or violate our intellectual property rights or the intellectual property rights of
                others
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>To submit false or misleading information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>To upload or transmit viruses or any other type of malicious code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mainColor mt-1">•</span>
              <span>To spam, phish, pharm, pretext, spider, crawl, or scrape</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaCopyright className="text-mainColor text-2xl" />,
      title: "Intellectual Property",
      content: (
        <p className="text-muted-foreground">
          The service and its original content, features, and functionality are and will remain the exclusive property
          of DevsHurdle and its licensors. The service is protected by copyright, trademark, and other laws. Our
          trademarks and trade dress may not be used in connection with any product or service without the prior written
          consent of DevsHurdle.
        </p>
      ),
    },
    {
      icon: <FaUserTimes className="text-mainColor text-2xl" />,
      title: "Termination",
      content: (
        <p className="text-muted-foreground">
          We may terminate or suspend your account and bar access to the service immediately, without prior notice or
          liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
          limited to a breach of the Terms.
        </p>
      ),
    },
    {
      icon: <FaExclamationTriangle className="text-mainColor text-2xl" />,
      title: "Disclaimer",
      content: (
        <p className="text-muted-foreground">
          The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law,
          DevsHurdle excludes all representations, warranties, conditions and terms whether express or implied,
          statutory or otherwise.
        </p>
      ),
    },
    {
      icon: <FaBalanceScale className="text-mainColor text-2xl" />,
      title: "Limitations",
      content: (
        <p className="text-muted-foreground">
          In no event shall DevsHurdle or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on DevsHurdle's website.
        </p>
      ),
    },
    {
      icon: <FaGavel className="text-mainColor text-2xl" />,
      title: "Governing Law",
      content: (
        <p className="text-muted-foreground">
          These terms and conditions are governed by and construed in accordance with the laws of applicable
          jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or
          location.
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
            { label: "Terms of Service", href: "/terms" },
          ]}
        />

        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-mainColor/10 rounded-full mb-6">
            <FaFileContract className="text-3xl text-mainColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using DevsHurdle.
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

          {/* Revisions */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">Revisions</h2>
            <p className="text-muted-foreground">
              The materials appearing on DevsHurdle's website could include technical, typographical, or photographic
              errors. DevsHurdle does not warrant that any of the materials on its website are accurate, complete, or
              current.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-mainColor/10 to-mainColor/5 rounded-xl border border-mainColor/20 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-mainColor/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-mainColor text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Need Clarification?</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, we're here to help.
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

      {/* Key Points Section */}
      <Section className="bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Key Points to Remember</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserShield className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Be Respectful</h3>
              <p className="text-sm text-muted-foreground">Treat others and their content with respect</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCopyright className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Respect IP Rights</h3>
              <p className="text-sm text-muted-foreground">Don't copy or misuse our content</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg border border-border">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBan className="text-mainColor text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Stay Legal</h3>
              <p className="text-sm text-muted-foreground">Use our platform only for lawful purposes</p>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
