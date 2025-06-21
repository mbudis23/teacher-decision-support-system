// src/app/(dashboard)/profile/page.jsx
import { Suspense } from "react";
import ProfilPageClient from "./ProfilePageClient";


export default function Page() {
  return (
    <Suspense fallback={<div>Memuat halaman profil...</div>}>
      <ProfilPageClient />
    </Suspense>
  );
}
