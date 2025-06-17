import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Dummy page for Forgot Password
export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">Reset Your Password</h1>
      <div className="space-y-4 text-lg text-foreground/80 max-w-md text-center">
        <p>
          Forgot your password? No worries! Enter your email address below, and if an account exists, we&apos;ll send
          you instructions to reset it.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email-reset" className="sr-only">
              Email Address
            </label>
            <Input id="email-reset" type="email" placeholder="Enter your email address" className="w-full text-base" />
          </div>
          <Button type="submit" className="w-full text-lg py-3" disabled>
            Send Reset Link (Coming Soon)
          </Button>
        </form>
        <p className="mt-4 p-4 bg-muted/50 rounded-md">
          Password reset functionality is currently under development. If you need assistance, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
