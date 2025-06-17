import Link from "next/link"

export default function AppFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-800 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">CustomPrintingCo.com</h3>
            <p className="text-sm text-foreground/70">Create custom merchandise with the power of AI.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-foreground/90 mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="text-sm text-foreground/70 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-foreground/70 hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-foreground/90 mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/privacy" className="text-sm text-foreground/70 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground/70 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} CustomPrintingCo.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Create dummy pages for the links to avoid 404s in preview
// In a real app, these would be actual pages.
export const AboutPage = () => (
  <div className="p-8">
    <h1>About Us</h1>
    <p>Content coming soon.</p>
  </div>
)
export const ContactPage = () => (
  <div className="p-8">
    <h1>Contact</h1>
    <p>Content coming soon.</p>
  </div>
)
export const FAQPage = () => (
  <div className="p-8">
    <h1>FAQ</h1>
    <p>Content coming soon.</p>
  </div>
)
export const PrivacyPage = () => (
  <div className="p-8">
    <h1>Privacy Policy</h1>
    <p>Content coming soon.</p>
  </div>
)
export const TermsPage = () => (
  <div className="p-8">
    <h1>Terms of Service</h1>
    <p>Content coming soon.</p>
  </div>
)
export const BlogPage = () => (
  <div className="p-8">
    <h1>Blog</h1>
    <p>Content coming soon.</p>
  </div>
)
