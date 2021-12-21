export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  joinedGroups: string[];
};
export type SignedIn = {
  (userState: UserState): void;
};
export type SignedOut = {
  (): void;
};
export type JoinedGroup = {
  (groupId1: string[]): void;
};

export type AuthContextType = {
  state: UserState;
  signedIn: SignedIn;
  signedOut: SignedOut;
  joinedGroup: JoinedGroup;
};
