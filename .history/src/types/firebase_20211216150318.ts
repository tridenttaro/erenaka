export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  groupId1?: string;
};
export type Signed_in = {
  (userState: UserState): void;
};
export type Signed_out = {
  (): void;
};

export type AuthContextType = {
  state: UserState;
  signedIn: Signed_in;
  signedOut: Signed_out;
};
