//import { useI18n } from '@/locales/client';
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../../components/ui/hover-card";




const Info = () => {
  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-colors group hover:bg-orange-50">
          <FaRegUser className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-sm text-gray-700">Mon compte</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-56 p-3 relative shadow-lg mt-3 border border-orange-200 rounded-xl bg-white"
        sideOffset={1}
        align="center"
        side="bottom"
      >
        {/* Flèche centrée pointant vers le trigger */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-white border-t border-l border-orange-200 z-10"></div>
        <div className="space-y-2 relative z-20 bg-white">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-orange-50">
              <FaRegUser className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Profil utilisateur</span>
            </div>
            <div className="border-t border-orange-100 my-2"></div>
            <div
              className="flex items-center px-3 py-2 rounded-md cursor-pointer hover:bg-orange-50"
            >
              <FaSignOutAlt className="h-4 w-4 mr-2 text-red-500" />
              <span className="text-sm font-medium text-red-500">Déconnexion</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Info;