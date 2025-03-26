import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { getWorkspaces } from "../../features/workspaces/queries";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaces = await getWorkspaces();

  // Ensure workspaces has the correct shape
  if (!workspaces || typeof workspaces !== "object" || !("documents" in workspaces) || !Array.isArray(workspaces.documents) || workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
