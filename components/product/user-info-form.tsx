"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox" // Import Checkbox
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export interface UserInfo {
  fullName: string
  email: string
  phone?: string
  companyName?: string
  marketingOptIn: boolean // Added marketing opt-in
}

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void
}

export default function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    marketingOptIn: true, // Default to true, or false based on preference
  })
  const [errors, setErrors] = useState<Partial<UserInfo>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name as keyof UserInfo]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<UserInfo> = {}
    if (!userInfo.fullName.trim()) newErrors.fullName = "Full name is required."
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Email is invalid."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(userInfo)
    }
  }

  return (
    <Card className="w-full bg-card text-foreground border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Your Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleChange}
              placeholder="e.g., Jane Doe"
              className="bg-background border-border focus:ring-primary"
            />
            {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="e.g., jane.doe@example.com"
              className="bg-background border-border focus:ring-primary"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={userInfo.phone || ""}
              onChange={handleChange}
              placeholder="e.g., (555) 123-4567"
              className="bg-background border-border focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="companyName">Company Name (Optional)</Label>
            <Input
              id="companyName"
              name="companyName"
              value={userInfo.companyName || ""}
              onChange={handleChange}
              placeholder="e.g., Acme Corp"
              className="bg-background border-border focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="marketingOptIn"
              name="marketingOptIn"
              checked={userInfo.marketingOptIn}
              onCheckedChange={(checked) => setUserInfo((prev) => ({ ...prev, marketingOptIn: Boolean(checked) }))}
            />
            <Label htmlFor="marketingOptIn" className="text-sm font-normal text-foreground/80 cursor-pointer">
              Receive occasional updates, promotions, and news from CustomPrintingCo.com.
            </Label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit} className="w-full">
          Submit Information & Confirm Order Request
        </Button>
      </CardFooter>
    </Card>
  )
}
