export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  groupId1?: string;
};
export type SignedIn = {
  (userState: UserState): void;
};
export type SignedOut = {
  (): void;
};

export type AuthContextType = {
  state: UserState;
  signedIn: SignedIn;
  signedOut: SignedOut;
};
