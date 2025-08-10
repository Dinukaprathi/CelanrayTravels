"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card } from "../components/ui/card";
import { Eye, EyeOff, CheckCircle2, Shield, Lock, User, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      setLoading(false);
      
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.href = "/admin/dashboard";
        }, 1200);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f0fa] via-[#e9e6f7] to-[#f7faff] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="fixed top-8 left-8 z-50" // changed from centered to left
          >
            <Card className="flex items-center gap-4 bg-green-500/95 border-2 border-green-700 shadow-lg px-8 py-5">
              <CheckCircle2 className="text-white w-8 h-8" />
              <div className="text-white">
                <h3 className="font-semibold text-lg">Login Successful!</h3>
                <p className="text-sm">Redirecting to dashboard...</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center md:text-left"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-accent/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Admin Portal</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-[#6A82FB] to-[#C46DD6] bg-clip-text text-transparent">Welcome</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#463f5e]">
                  Mr. Lahiru Manchanayake
                </h2>
                <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0 leading-relaxed">
                  Access your comprehensive tourism management dashboard with enhanced security and professional tools.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl border-primary/10 shadow-lg p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A82FB] to-[#C46DD6]" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-light/5 rounded-full blur-xl" />
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#6A82FB] to-[#C46DD6] flex items-center justify-center shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#463f5e] mb-2">Secure Access</h3>
                  <p className="text-gray-700">Enter your credentials to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-[#463f5e] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder="admin@ceylanray.com"
                      className="h-12 border-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm transition-all"
                      required
                    />
                  </div>
                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-[#463f5e] flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder="Enter your secure password"
                        className="h-12 border-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm pr-12 transition-all"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all p-1 rounded-md hover:bg-accent/50"
                        onClick={() => setShowPass((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">
                        Use secure enterprise credentials
                      </div>
                      <button type="button" className="text-xs text-[#463f5e] hover:text-primary underline-offset-2 hover:underline transition-all">
                        Need Help?
                      </button>
                    </div>
                  </div>
                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-white text-sm bg-red-500 border-2 border-red-600 p-4 rounded-lg flex items-center gap-3 shadow-lg">
                          <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">!</span>
                          </div>
                          <span className="font-semibold">{error}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold relative overflow-hidden"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5" />
                          Access Dashboard
                        </>
                      )}
                    </span>
                  </Button>
                  {/* Security Note */}
                  <div className="text-center pt-4 border-t border-primary/10">
                    <p className="text-xs text-gray-600">
                      Protected by enterprise-grade encryption
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-600">Secure Connection</span>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs text-gray-600">
          Powered by <span className="font-semibold text-[#463f5e]">Thaprolabs</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin; 