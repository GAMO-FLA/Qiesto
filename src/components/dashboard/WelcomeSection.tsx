import { motion } from "framer-motion";

const WelcomeSection = ({ user }) => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 mb-6 pt-5 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-2"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
          Welcome {user?.fullName || 'Admin'}!
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Here's what's happening with your challenges
        </p>
      </motion.div>
    </div>
  );

export default WelcomeSection;