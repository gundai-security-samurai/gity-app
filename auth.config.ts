import type { NextAuthConfig } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export default {
  providers: [Keycloak],
} satisfies NextAuthConfig;
