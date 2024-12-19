import { SiKeycloak } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

const SignInPage = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
      className="flex flex-col gap-8 items-center justify-center h-full"
    >
      <p className="text-foreground/80">
        Gity登録時のアカウントでログインできます。
      </p>
      <Button>
        <SiKeycloak className="mr-2" />
        keycloakでログイン
      </Button>
    </form>
  );
};

export default SignInPage;
