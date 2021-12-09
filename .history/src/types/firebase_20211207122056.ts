export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};
export type Signed_In = {
  (userState: UserState): void;
};

export type AuthContextType = {
  state: UserState;
  signed_In: Signed_In;
};
