/* eslint-disable @next/next/no-img-element */
import { Navbar, TextInput } from "flowbite-react";

export default function Nav({ user }) {
  return (
    <Navbar
      style={{
        backgroundColor: "white",
        color: "black",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "1rem 2rem",
        borderBottom: "5px solid rgba(0, 0, 0, 0.3)",
      }}
      fluid={true}
    >
      <Navbar.Brand href="/">
        <img
          src="/images/logo.png"
          className="mr-3 h-12 sm:h-12"
          alt="Brofiber Logo"
        />
      </Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
