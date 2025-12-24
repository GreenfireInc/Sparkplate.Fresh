import { type LocaleCode } from "@/lib/i18n";

export interface User {
  id: number;
  name: string;
  email: string;
}

//TODO: Replace with actual users from the database; Create separate component for users
export const baseUsers: User[] = [
  { id: 1, name: "Guest", email: "guest@greenfire.io" },
  { id: 2, name: "Francis", email: "francis@greenfire.io" },
  { id: 3, name: "Elizabeth", email: "elizabeth@greenfire.io" },
  { id: 4, name: "Goldie", email: "goldie@greenfire.io" }
];

export const getMockUsers = (language: LocaleCode, getTranslation: (lang: LocaleCode, key: string) => string): User[] => {
  return [
    ...baseUsers,
    { id: 0, name: getTranslation(language, "createAccount"), email: "" }
  ];
};

export const handleUserSelect = (
  userName: string,
  mockUsers: User[],
  getTranslation: (lang: LocaleCode, key: string) => string,
  language: LocaleCode,
  setSelectedUser: (user: string) => void,
  setSelectedUserEmail: (email: string) => void,
  setShowSignupModal: (show: boolean) => void,
  setShowUserModal?: (show: boolean) => void
) => {
  if (userName === getTranslation(language, "createAccount")) {
    setShowSignupModal(true);
  } else {
    const user = mockUsers.find(u => u.name === userName);
    setSelectedUser(userName);
    setSelectedUserEmail(user?.email || "");
    if (setShowUserModal) {
      setShowUserModal(true);
    }
  }
};
