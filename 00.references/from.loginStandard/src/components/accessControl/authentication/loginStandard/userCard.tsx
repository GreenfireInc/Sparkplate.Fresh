import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
  spacing?: "none" | "tight" | "normal" | "loose";
}

export const UserCard = ({ name, isSelected, onClick, spacing = "normal" }: UserCardProps) => {
  const spacingClass = {
    none: "mb-0",
    tight: "mb-1",
    normal: "mb-3", 
    loose: "mb-6"
  }[spacing];

  return (
    <button
      onClick={onClick}
      className={cn(
        `w-56 p-3 bg-gradient-user-card border border-white/20 rounded-lg ${spacingClass}`,
        "hover:bg-gradient-user-card-hover hover:border-white/30",
        "transition-all duration-200 ease-windows",
        "flex items-center gap-3 text-left shadow-user-card",
        "focus:outline-none focus:ring-2 focus:ring-white/50",
        "relative z-30",
        isSelected && "bg-gradient-user-card-hover border-white/40"
      )}
    >
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <span className="font-windows text-white font-medium text-sm">
        {name}
      </span>
    </button>
  );
};

export default UserCard;

