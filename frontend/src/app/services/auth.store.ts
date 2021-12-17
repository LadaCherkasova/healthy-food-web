import { Injectable } from '@angular/core';
import { persistState, Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  token: string;
  isLogged: boolean;
  isAdmin: boolean;
  username: string;
  userId: string;
}

export function createInitialState(): AuthState {
  return {
    token: '',
    isLogged: false,
    isAdmin: false,
    username: '',
    userId: '',
  };
}

const authStoreKey = 'healthy-food-auth-store';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: authStoreKey })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}

export const persistStorage = persistState({include: [authStoreKey]});
