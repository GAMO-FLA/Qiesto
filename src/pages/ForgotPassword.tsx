import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 relative"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            {/* Your Logo Component */}
            <h1 className="text-2xl font-bold text-white">Logo</h1>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
          <p className="text-gray-300">Enter your email to reset your password</p>
        </div>

        <form className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Remembered your password?{' '}
          <Link to="/signin" className="text-primary hover:text-primary/90">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword; 