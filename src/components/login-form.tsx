import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import { SetStateAction, useCallback, useState } from 'react';
import logo from '../assets/images/pristiale.svg';
import { toast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const changeEmail = useCallback(
    (e: { target: { value: SetStateAction<string> } }) =>
      setEmail(e.target.value),
    [setEmail],
  );
  const changePassword = useCallback(
    (e: { target: { value: SetStateAction<string> } }) =>
      setPassword(e.target.value),
    [setPassword],
  );
  const handleLogin = useCallback(async () => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!response.error) {
      navigate('/');
      toast({
        title: 'Login Successful',
        description: `You have logged into your account successfully.`,
      });
      return;
    }

    toast({
      title: 'Login Error',
      description: `Please check your email and password.`,
    });
  }, [email, password]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="helvetica mx-auto max-w-sm">
        <CardHeader>
          <div className="p-8 px-16">
            <img src={logo} height={32} />
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={changeEmail}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  className="ml-auto inline-block text-sm underline"
                  to={''}
                  
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={changePassword}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <Button disabled variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link className="underline" to={'/signup'}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
