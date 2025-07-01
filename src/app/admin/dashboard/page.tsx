import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('admin_token');

  if (!authToken || authToken.value !== 'authenticated') {
    redirect('/admin/login');
  }

  return <AdminDashboardClient />;
} 