import { Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import NotificationsDropdown from '@/components/dashboard/NotificationsDropdown';
import ProfileDropdown from '@/components/dashboard/ProfileDropdown';

const MobileHeader = ({ user, onSignOut }) => (
    <div className={cn(
      "lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md",
      "border-b border-gray-200 px-3 py-2"
    )}>
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-1.5">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-base">Qiesto</span>
        </Link>
        
        <div className="flex items-center gap-1">
          <NotificationsDropdown />
          <ProfileDropdown user={user} onSignOut={onSignOut} />
        </div>
      </div>
    </div>
);
export default MobileHeader;