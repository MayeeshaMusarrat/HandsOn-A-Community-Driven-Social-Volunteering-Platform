"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "../components/ui/button.tsx"
import { Input } from "../components/ui/input.tsx"
import { Label } from "../components/ui/label.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { supabase } from "../config/supabaseClient.ts" 
import { imageStrings } from "../utils/image_strings.ts"

export default function SignupPage() {
  const navigate = useNavigate()

  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

   useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        navigate('/dashboard') 
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [snackbar, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { email, password, firstName, lastName } = formData
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
          },
        },
      })

      if (error) {
        setSnackbar({ message: `Signup failed: ${error.message}`, type: 'error' })
        return
      }

  
      setSnackbar({ 
        message: 'Signup successful! Please check your email to confirm your account.', 
        type: 'success' 
      })
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSnackbar({ message: 'An unexpected error occurred. Please try again.', type: 'error' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-12 sm:px-6 lg:px-8 gap-8 md:gap-16 relative">
      {/* Logo */}
      <img 
        src={imageStrings.logo}
        alt="Logo" 
        className="w-32 h-auto mb-8 md:mb-0 md:absolute md:top-8 md:left-8 lg:w-40 lg:top-12 lg:left-12"
      />

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm sm:text-base">
            Join our community and start making a difference
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full text-sm sm:text-base"
              variant="blue"
            >
              Sign up
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar Notification */}
      {snackbar && (
        <div className={`fixed bottom-4 right-4 left-4 sm:left-auto px-4 py-3 rounded-md shadow-lg z-50
          ${snackbar.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm">{snackbar.message}</span>
            <button 
              onClick={() => setSnackbar(null)}
              className="ml-4 hover:opacity-75 focus:outline-none"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}