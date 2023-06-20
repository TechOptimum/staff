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
 import { icons } from "./icons";
 import { useTheme as useNextTheme } from "next-themes";
 import { useTheme } from "@nextui-org/react";
 
 export const Nav = () => {
   const { setTheme } = useNextTheme();
   const { isDark, type } = useTheme();
   const collapseItems = ["Main Website", "Dashboard", "Staff Handbook", "Your Team"];
   return (
     <Navbar variant="sticky">
       <Navbar.Brand>
         <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
         <Text as="a" href="/#" b color="inherit">
           Tech Optimum Staff Home
         </Text>
         <Navbar.Content
           hideIn="sm"
           css={{
             pl: "6rem",
           }}
         >
           <Navbar.Link  href="https://techoptimum.org">Main Website</Navbar.Link>
           <Navbar.Link  href="https://dashboard.techoptimum.org">Dashboard</Navbar.Link>
           <Navbar.Link  href="https://techoptimum.notion.site/Staff-Handbook-afb659f99c614c1baad74adc18bf2def">Staff Handbook</Navbar.Link>
           <Navbar.Link  href="/team">Your Team</Navbar.Link>
         </Navbar.Content>
       </Navbar.Brand>
 
       <Navbar.Collapse>
         {collapseItems.map((item, index) => (
           <Navbar.CollapseItem key={item}>
             <Link
               color="inherit"
               css={{
                 minWidth: "100%",
               }}
               href="#"
             >
               {item}
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
         <Navbar.Item>
             <Button as="a" href="https://discord.gg/DstVc7tr4D" auto flat>
               Discord
             </Button>
    
         </Navbar.Item>
         <Navbar.Item hideIn={"xs"}>
           <Switch
             checked={isDark}
             onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
           />
         </Navbar.Item>
       </Navbar.Content>     
     </Navbar>
   );
 };