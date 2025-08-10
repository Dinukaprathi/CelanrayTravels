import { redirect } from "next/navigation";

export default function AdminPackagesRedirect() {
  redirect("/admin/dashboard/packages");
  return null;
} 