import { redirect } from "next/navigation";

export default function CustomerDashboard() {
  redirect("/dashboard/profile");
}