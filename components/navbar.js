import axios from "axios";

import { Navbar, TextInput } from "flowbite-react";

import { useRouter } from "next/router";

export default function Nav({ user }) {
  const router = useRouter();

  const handleLogOut = async () => {
    const user = await axios.get("/api/auth/logout");
    router.push("/login");
  };
  return (
    <Navbar
      style={{
        backgroundColor: "white",
        color: "black",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      fluid={true}
    >
      <Navbar.Brand href="/">
        <img
          src="/logo-wit.png"
          className="mr-3 h-6 sm:h-9"
          alt="Brofiber Logo"
        />
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.Link style={{ color: "white" }} href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link style={{ color: "white" }} href="/aanmelding/toevoegen">
          Aanmelding Toevoegen
        </Navbar.Link>
        <Navbar.Link style={{ color: "white" }} href="/adres">
          Adres
        </Navbar.Link>
        <Navbar.Link style={{ color: "white" }} href="/acties">
          Acties
        </Navbar.Link>
        <Navbar.Link style={{ color: "white" }} href="/finance">
          Financieel
        </Navbar.Link>
        <Navbar.Link
          style={{ color: "white" }}
          href="#"
          onClick={() => handleLogOut()}
        >
          Log Out
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
