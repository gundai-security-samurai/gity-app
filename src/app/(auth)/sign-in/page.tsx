import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

const SignInPage = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button>Sign in with keycloak</Button>
    </form>
  );
};

export default SignInPage;
