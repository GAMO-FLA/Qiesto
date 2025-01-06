import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

const PartnerPending = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your interest in becoming a partner. Our team will review your application 
          and contact you within 2-3 business days.
        </p>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Have questions? Contact us at{' '}
            <a href="mailto:partners@qiesto.com" className="text-primary">
              partners@qiesto.com
            </a>
          </p>
          
          <Link to="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PartnerPending; 