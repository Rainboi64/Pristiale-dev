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
import supabase from '@/utils/supabase';
import { useState, useCallback, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/pristiale.svg';
import { toast } from '@/hooks/use-toast';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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

  const changeFirstName = useCallback(
    (e: { target: { value: SetStateAction<string> } }) =>
      setFirstName(e.target.value),
    [setPassword],
  );

  const changeLastName = useCallback(
    (e: { target: { value: SetStateAction<string> } }) =>
      setLastName(e.target.value),
    [setPassword],
  );

  const handleSignup = useCallback(async () => {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: { data: { firstName, lastName } },
    });

    if (!response.error) {
      toast({
        title: 'Sign up completed',
        description: `Please check your email for confirmation.`,
      });
      navigate('/');
      return;
    }

    toast({
      title: 'Login Error',
      description: `Please check your email and password.`,
    });
  }, [email, password]);

  return (
    <div className="helvetica flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <div className="p-8 px-16">
            <img src={logo} height={32} />
          </div>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={firstName}
                  onChange={changeFirstName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  value={lastName}
                  onChange={changeLastName}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={changeEmail}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={changePassword}
                value={password}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSignup}>
              Create an account
            </Button>
            <Button disabled variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline" to={'/login'}>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
