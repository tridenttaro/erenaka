export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};

export type AuthContextType = {
  state: UserState;
  signed_In: (userState: UserState) => void;
};
