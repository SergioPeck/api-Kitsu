import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type'
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {

  async createWithGoogle(idToken: string): Promise<AuthResponse> {
    if (!idToken) {
      throw new UnauthorizedException('ID token is required');
    }

    const decoded = await admin.auth().verifyIdToken(idToken);
    return {
      uid: decoded.uid,
      email: decoded.email,
      displayName: decoded.name,
      provider: 'google',
    };
  }

  async createWithEmail(idToken: string): Promise<AuthResponse> {
    if (!idToken) {
      throw new UnauthorizedException('ID token is required');
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    return {
      uid: decoded.uid,
      email: decoded.email,
      displayName: decoded.name,
      provider: 'email',
    };
  }

  // Firebase no tiene logout en backend → solo invalidamos tokens
  async logout() {
    return { message: 'Logout successful (handled on client side).' };
  }
}
