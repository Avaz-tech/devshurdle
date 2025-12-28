"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "@components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Breadcrumb from "@components/Breadcrumb";
import PageLayout from "@components/PageLayout";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-mainColor/15 to-transparent pb-8 px-4">
        <Container className="mx-auto">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} noBorder={true} />

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or need help? We&apos;d love to hear from you. Reach out and let&apos;s build
              something amazing together.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 px-4">
        <Container className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Let&apos;s Start a Conversation</h2>
                <p className="text-muted-foreground mb-8">
                  Whether you&apos;re looking for coding solutions, want to contribute to the platform, or just want to
                  say hello, we&apos;re here to help. Don&apos;t hesitate to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mainColor/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-mainColor text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@devshurdle.com</p>
                    <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mainColor/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-mainColor text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mainColor/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-mainColor text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Developer Street
                      <br />
                      Tech City, TC 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/devshurdle"
                    className="w-10 h-10 bg-mainColor/10 rounded-lg flex items-center justify-center hover:bg-mainColor hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                  <a
                    href="https://twitter.com/devshurdle"
                    className="w-10 h-10 bg-mainColor/10 rounded-lg flex items-center justify-center hover:bg-mainColor hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-lg" />
                  </a>
                  <a
                    href="https://linkedin.com/company/devshurdle"
                    className="w-10 h-10 bg-mainColor/10 rounded-lg flex items-center justify-center hover:bg-mainColor hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Thank you for your message! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">Something went wrong. Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input id="name" {...register("name")} placeholder="Enter your full name" className="mt-1" />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="subject" className="text-foreground font-medium">
                    Subject *
                  </Label>
                  <Input id="subject" {...register("subject")} placeholder="What's this about?" className="mt-1" />
                  {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us more about your inquiry..."
                    className="mt-1 min-h-[120px]"
                  />
                  {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-mainColor hover:bg-mainColor/90 text-white font-semibold py-3"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 px-4 bg-card/50">
        <Container className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about DevsHurdle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">How can I contribute to DevsHurdle?</h3>
              <p className="text-muted-foreground text-sm">
                You can contribute by submitting solutions, reporting bugs, or suggesting new features. Check our GitHub
                repository for contribution guidelines.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Is DevsHurdle free to use?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! DevsHurdle is completely free to use. We believe in making coding resources accessible to everyone.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Can I request specific coding solutions?</h3>
              <p className="text-muted-foreground text-sm">
                Absolutely! We&apos;re always looking for new challenges. Submit your request through our contact form
                and we&apos;ll consider adding it to our collection.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-2">How often is the content updated?</h3>
              <p className="text-muted-foreground text-sm">
                We regularly add new solutions and update existing ones. Follow us on social media or subscribe to our
                newsletter for the latest updates.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
