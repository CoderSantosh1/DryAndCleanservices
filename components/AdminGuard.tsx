// components/AdminGuard.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("admin_user");
    if (!admin) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Checking admin access…
      </div>
    );
  }

  return <>{children}</>;
}
