import Link from "next/link"
// Dummy page for Sign Up
export default function SignUpPage() {
  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">Create Your Account</h1>
      <div className="space-y-4 text-lg text-foreground/80 max-w-md text-center">
        <p>
          Join CustomPrintingCo.com to easily manage your designs, track orders, and enjoy a personalized experience.
        </p>
        <p className="mt-6 p-4 bg-muted/50 rounded-md">
          Our full sign-up process is coming soon! For now, you can proceed with placing an order request, and an
          account may be created for you as part of that process if you opt-in.
        </p>
        <p className="mt-4">
          If you have any questions, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
