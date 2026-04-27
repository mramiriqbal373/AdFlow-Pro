import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';
import { signJwt } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into public.users table
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        { name, email, password: hashedPassword, role: 'user' }
      ])
      .select('id, name, email, role')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Generate JWT token
    const token = await signJwt({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return NextResponse.json({
      message: 'Registration successful',
      user,
      token
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
