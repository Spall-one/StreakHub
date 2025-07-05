import '../globals.css';
export const metadata = { title: 'Streak Admin' };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>;
}
