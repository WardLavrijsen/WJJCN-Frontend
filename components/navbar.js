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
        backgroundColor: "rgb(31 41 55)",
        color: "white",
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
      <div className="flex md:order-2">
        <TextInput
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              GetData();
            }
          }}
          id="search"
          type="text"
          placeholder="Zoeken..."
          required={true}
        />

        <Navbar.Toggle />
      </div>

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
