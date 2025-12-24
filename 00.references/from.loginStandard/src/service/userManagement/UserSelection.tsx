import React from "react";
import { UserCard } from "@/components/accessControl/authentication/loginStandard/userCard";
import { type LocaleCode } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserSelectionProps {
  mockUsers: User[];
  selectedUser: string;
  language: LocaleCode;
  onUserSelect: (userName: string) => void;
}

export const UserSelection: React.FC<UserSelectionProps> = ({
  mockUsers,
  selectedUser,
  language,
  onUserSelect,
}) => {
  return (
    <>
      {/* Regular Users - positioned higher */}
      <div className="absolute bottom-32 left-8 w-64 z-20">
        <div className="space-y-0">
          {mockUsers
            .filter((user) => user.name !== getTranslation(language, "createAccount"))
            .map((user, idx, arr) => (
              <UserCard
                key={user.id}
                name={user.name}
                isSelected={selectedUser === user.name}
                onClick={() => onUserSelect(user.name)}
                spacing={user.name === "Corey" ? "none" : "tight"}
              />
            ))}
        </div>
      </div>

      {/* Create Account - in original position */}
      <div className="absolute bottom-10 left-8 w-64 z-20">
        {mockUsers
          .filter((user) => user.name === getTranslation(language, "createAccount"))
          .map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              isSelected={selectedUser === user.name}
              onClick={() => onUserSelect(user.name)}
              spacing="normal"
            />
          ))}
      </div>
    </>
  );
};
