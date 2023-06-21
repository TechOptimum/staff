import {
  Modal,
  Divider,
  Button,
  Link,
  Navbar,
  Switch,
  Text,
  Card,
} from "@nextui-org/react";
import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@nextui-org/react";
import { motion } from "framer-motion";

const navbarVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const collapseItems = [
    { name: "Main Website", url: "https://techoptimum.org" },
    { name: "Dashboard", url: "https://dashboard.techoptimum.org" },
    {
      name: "Staff Handbook",
      url: "https://techoptimum.notion.site/Staff-Handbook-afb659f99c614c1baad74adc18bf2def",
    },
    { name: "The Team", url: "/team" },
    { name: "Log Volunteer Hours", url: "/volunteer-hours" },
  ];
  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
        <Link href="/">
          <Text h3 color="inherit">
            Tech Optimum Staff Portal
          </Text>
        </Link>
        <motion.div variants={navbarVariants} initial="hidden" animate="show">
          <Navbar.Content
            variant={"highlight-rounded"}
            enableCursorHighlight
            hideIn="sm"
            css={{
              pl: "6rem",
            }}
          >
            {collapseItems.map((item, index) => (
              <motion.div key={item.name} variants={linkVariants}>
                <Navbar.Link href={item.url}>{item.name}</Navbar.Link>
              </motion.div>
            ))}
          </Navbar.Content>
        </motion.div>
      </Navbar.Brand>

      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item.name}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href={item.url}
            >
              {item.name}
            </Link>
          </Navbar.CollapseItem>
        ))}

        <Navbar.CollapseItem>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </Navbar.CollapseItem>
      </Navbar.Collapse>
      <Navbar.Content>
        <Navbar.Item hideIn="xs">
          <div style={{ display: "flex", alignItems: "center" }}>
            {isDark ? (
              <FaMoon style={{marginTop: "0.2rem", paddingRight: "3" }} />
            ) : (
              <BsFillSunFill style={{marginTop: "0.2rem", paddingRight: "3" }} />
            )}
            <Switch
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </div>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
