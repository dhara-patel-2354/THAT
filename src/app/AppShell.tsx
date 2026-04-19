import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function AppShell() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex flex-col" id="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
