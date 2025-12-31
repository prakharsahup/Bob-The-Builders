import { Link, useLocation } from 'react-router-dom';
import { Sprout, User, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ type = 'founder' }) => {
  const location = useLocation();
  const isFounder = type === 'founder';

  const founderLinks = [
    { path: '/founder/dashboard', label: 'Projects' },
    { path: '/founder/search', label: 'Find VCs' },
    { path: '/founder/messages', label: 'Messages' }
  ];

  const vcLinks = [
    { path: '/vc/dashboard', label: 'Inbox' }
  ];

  const links = isFounder ? founderLinks : vcLinks;

  const switchPath = isFounder ? '/vc/dashboard' : '/founder/dashboard';
  const switchLabel = isFounder ? 'Switch to VC View' : 'Switch to Founder View';

  return (
    <nav className="gradient-bg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isFounder ? '/founder/dashboard' : '/vc/dashboard'} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-2 rounded-lg"
            >
              <Sprout className="h-6 w-6 text-primary-600" />
            </motion.div>
            <span className="text-white font-bold text-xl">FundMatch</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 rounded-lg text-white font-medium transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Demo: Switch between founder and VC views */}
            <Link
              to={switchPath}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span className="hidden sm:inline">{switchLabel}</span>
            </Link>

            {/* User profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
