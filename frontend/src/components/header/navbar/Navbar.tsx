import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LetterBox from "../../containers/letterBox/LetterBox";
import DropdownCompo from "./dropdown";
import ThemeToggle from "./themeToggle";

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: flex-end;
  gap: 20px;
  background-color: rgba(0, 102, 255, 0.1);
`;

const MainNav = styled.div`
  transition: all 0.3 ease 0s;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const NavItem = styled(LetterBox)`
  color: white;
  font-size: 20px;
`;

export const Navbar = () => {
  // recoil

  // state
  const [isArtist, setIsArtist] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Nav>
      <Link to={"/"}>
        <img src="img/Logo.png"></img>
      </Link>
      <MainNav>
        <NavLink to={"/artist"}>
          <NavItem size="h2" weight="extraBold">
            ARTIST
          </NavItem>
        </NavLink>
        <NavLink to={"/badge"}>
          <NavItem size="h2" weight="extraBold">
            BADGE
          </NavItem>
        </NavLink>
      </MainNav>
      <NavLink to={"/about"}>
        <NavItem size="h2" weight="extraBold">
          ABOUT
        </NavItem>
      </NavLink>
      {isArtist ? <NavLink to={"/minting"}>Mint</NavLink> : null}
      {isAdmin ? <NavLink to={"/admin"}>Admin</NavLink> : null}
      <ThemeToggle />
      <DropdownCompo />
    </Nav>
  );
};
