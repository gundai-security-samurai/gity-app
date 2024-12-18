import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const HomePage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return <div className="">home</div>;
};

export default HomePage;
