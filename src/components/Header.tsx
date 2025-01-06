import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { 
      label: 'Challenges',
      path: '/challenges',
      submenu: [
        { label: 'Browse All', path: '/challenges' },
        { label: 'Featured', path: '/challenges/featured' },
        { label: 'Upcoming', path: '/challenges/upcoming' },
      ]
    },
    { 
      label: 'Projects',
      path: '/projects',
      submenu: [
        { label: 'Showcase', path: '/projects' },
        { label: 'Latest', path: '/projects/latest' },
        { label: 'Popular', path: '/projects/popular' },
      ]
    },
    { 
      label: 'Community',
      path: '/community',
      submenu: [
        { label: 'Members', path: '/community' },
        { label: 'Events', path: '/community/events' },
        { label: 'Blog', path: '/community/blog' },
      ]
    },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 bg-gradient-to-br backdrop-blur-xl transition-all duration-500`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Logo />
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Button
                      variant="ghost"
                      className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-primary bg-primary/10'
                          : 'bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-gradient-to-br backdrop-blur-xl dark:bg-gray-900/90">
                  {item.submenu.map((subitem) => (
                    <DropdownMenuItem key={subitem.label} asChild>
                      <Link
                        to={subitem.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {subitem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/signin">
                <Button 
                  variant="ghost" 
                  className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/signup">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-gray-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-gray-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl z-40"
            >
              <div className="container mx-auto px-4 py-20">
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={item.label}
                      className="group"
                    >
                      <Link
                        to={item.path}
                        className="text-2xl font-medium text-white group-hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <div className="mt-2 pl-4 space-y-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.label}
                            to={subitem.path}
                            className="text-sm text-gray-400 hover:text-primary transition-colors block"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-white hover:text-primary mb-4"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};