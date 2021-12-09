export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};

export type AuthContextType = {
  state: UserState;
  signIn_did: (userState: UserState) => void;
};
