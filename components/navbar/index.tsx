import { getUser } from "@lib/auth/get-user";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const user = await getUser();

  return <NavbarClient user={user} />;
}
