'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const Alert = ({ className, children }: { variant?: string, className?: string, children: React.ReactNode }) => (
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
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      // Trim whitespace from inputs
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      
      const result = await login(trimmedEmail, trimmedPassword);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
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
            <CardDescription className="mt-1">
              Enter your credentials to access the AGD administration system.
            </CardDescription>
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
                    className="pl-10"
                    placeholder="Enter your email address"
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
                    className="pl-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
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