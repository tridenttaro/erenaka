export type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
  group_id?: string;
};
export type Signed_In = {
  (userState: UserState): void;
};
export type Signed_Out = {
  (): void;
};

export type AuthContextType = {
  state: UserState;
  signed_In: Signed_In;
  signed_Out: Signed_Out;
};
