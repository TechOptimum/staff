import React from "react";
import { Card, Grid, Text } from "@nextui-org/react";
import { CgWebsite } from "react-icons/cg";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { MdPeopleOutline } from "react-icons/md";
import { BiGroup } from "react-icons/bi";
import { IoMdPeople } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiUserSharedFill } from "react-icons/ri";
import { RiUserShared2Fill } from "react-icons/ri";
import { RiUserShared2Line } from "react-icons/ri";
import { RiUserSharedLine } from "react-icons/ri";

const departments = [
  { id: "web-dev", name: "Web Dev", icon: <CgWebsite /> },
  { id: "education", name: "Education", icon: <FaUserGraduate /> },
  { id: "hr", name: "HR", icon: <AiOutlineUser /> },
  { id: "social-media", name: "Social Media", icon: <RiTeamFill /> },
  { id: "design", name: "Design", icon: <GiTeacher /> },
  { id: "community", name: "Community", icon: <MdPeopleOutline /> },
  { id: "outreach", name: "Outreach", icon: <BiGroup /> },
  {
    id: "hackathon-organizer",
    name: "Hackathon Organizer",
    icon: <IoMdPeople />,
  },
  { id: "video-editor", name: "Video Editor", icon: <BsFillPeopleFill /> },
];

const DepartmentCard = ({ department }) => (
  <Grid>
    <Card
      css={{
        mw: "200px",
        minWidth: "200px",
        justifyContent: "center",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)"},

      }}
      isHoverable
      isPressable
      variant="bordered"
    >
      <Card.Body>
        <a href={`/department/${department.id}`}>
          <Text size={25}>{department.icon}</Text>
          <Text size={18} style={{ margin: 0, alignItems: "center" }}>
            {department.name}
          </Text>
        </a>
      </Card.Body>
    </Card>
  </Grid>
);

const StaffHome = () => (
  <div>
    <Grid.Container
      css={{ marginTop: "2rem", maxW: "80%", margin: "auto !important" }}
      gap={2}
      justify="center"
    >
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </Grid.Container>
  </div>
);

export default StaffHome;
