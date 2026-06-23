import LoginForm from './LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal Login — Debre Berhan Unity Sunday School',
  description: 'Access student, teacher, admin, super admin, or parent portal.',
};

export default function LoginPage() {
  return <LoginForm />;
}
