import { User } from "@firebase/auth";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type AuthenticatedUserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const AuthenticatedUserContext =
  createContext<AuthenticatedUserContextType>({
    user: null,
    setUser: (u) => u,
  });

export const AuthenticatedUserProvider = ({
  children,
}: {
  children: [React.Component];
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
