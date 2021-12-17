export type UserState = {
  is_signed_in: boolean;
  role: string;
  uid: string;
  username: string;
  group_id_1: string;
};
export type Signed_in = {
  (userState: UserState): void;
};
export type Signed_out = {
  (): void;
};

export type AuthContextType = {
  state: UserState;
  signed_in: Signed_in;
  signed_out: Signed_out;
};
