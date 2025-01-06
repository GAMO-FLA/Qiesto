import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';

const SignUp = () => {
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
            <Logo />
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Create an account</h2>
          <p className="text-gray-300">Join Rwanda's tech innovation community</p>
        </div>

        <div className="space-y-4 mb-6">
          <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
            <Github className="w-5 h-5 mr-2" />
            Sign up with GitHub
          </Button>
          <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
            <Mail className="w-5 h-5 mr-2" />
            Sign up with Google
          </Button>
        </div>

        <div className="relative mb-6">
          <Separator className="bg-white/10" />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-sm text-gray-400">
            or continue with
          </span>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="First name"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
            <Input
              type="text"
              placeholder="Last name"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Input
            type="email"
            placeholder="Email address"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
          <p className="text-xs text-gray-400">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary/90">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary/90">
              Privacy Policy
            </Link>
          </p>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Create account
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:text-primary/90">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp; 