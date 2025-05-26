'use client';

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock UI components using Tailwind CSS for styling
// const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
//   <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>{children}</div>
// );
// const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );
// const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
//   <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
// );
// const CardDescription = ({ className, children }: { className?: string, children: React.ReactNode }) => (
//   <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
// );
// const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );
// const CardFooter = ({ className, children }: { className?: string, children: React.ReactNode }) => (
//   <div className={`p-6 border-t border-gray-200 ${className}`}>{children}</div>
// );
const Label = ({ htmlFor, className, children }: { htmlFor?: string, className?: string, children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>{children}</label>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm ${props.className}`} />
);
const Alert = ({ className, children }: { variant?: string, className?: string, children: React.ReactNode }) => (
  // Basic alert styling, destructive variant would add more specific color classes
  <div className={`p-4 mb-4 border rounded-md bg-red-50 border-red-300 text-red-700 ${className}`}>{children}</div>
);
const AlertDescription = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);
const Separator = ({ className }: { className?: string }) => (
  <hr className={`border-gray-200 ${className}`} />
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      console.log("Login attempt with:", email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError("Login functionality will be implemented by the administrator");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            Administration Portal
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Secure access for staff and administrators.
          </p>
        </div>
        
        <Card className="shadow-xl">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-2xl text-gray-700">Sign in to your account</CardTitle>
            <CardDescription className="mt-1">Enter your credentials to access the system.</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-2 pb-4">
            {error && (
              <Alert className="mb-4 bg-red-50 border-red-500 text-red-700">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <AlertDescription>{error}</AlertDescription>
                </div>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 py-2.5" // Adjusted padding for icon
                    placeholder="skanda@agd.gov.mw"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/reset-password" // Next.js Link
                    className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-10 py-2.5" // Adjusted padding for icon
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold py-2.5 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          
          <Separator className="my-0" />
          
          <CardFooter className="flex justify-center py-4">
            <p className="text-sm text-gray-600">
              Having trouble logging in?{" "}
              <Link href="/contact" className="font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] hover:underline">
                Contact the Administrator
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Accountant General&apos;s Department. All rights reserved.
        </p>
      </div>
    </div>
  );
} 