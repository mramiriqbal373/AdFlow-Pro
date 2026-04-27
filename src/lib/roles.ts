import { verifyJwt } from './jwt';
import { cookies } from 'next/headers';

/**
 * Checks if the current user has the required role.
 * Intended to be used in Server Components or Server Actions.
 */
export async function hasRole(requiredRole: 'admin' | 'user'): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return false;

  const payload = await verifyJwt(token);
  if (!payload) return false;

  return payload.role === requiredRole;
}

/**
 * Gets the current user payload.
 * Intended to be used in Server Components or Server Actions.
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  return await verifyJwt(token);
}
