import React from "react";
import { Card, Grid, Text, Button, Divider } from "@nextui-org/react";
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
import { GiFireworkRocket} from "react-icons/gi";
import { BsBriefcase} from "react-icons/bs";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const departments = [
  { 
    id: "web-dev", 
    name: "Web Developer",
    video: "https://youtu.be/RzabGYX2A-U",
    icon: <CgWebsite /> 
  },
  { 
    id: "education",
    name: "Education", 
    video: "https://youtu.be/aVlSQAiB28w",
    icon: <FaUserGraduate /> 
  },
  { 
    id: "hr", 
  name: "Human Resources", 
  video: "https://youtu.be/F5oFiX8PSPs", 
  icon: <AiOutlineUser /> 
  },
  { 
    id: "social-media", 
  name: "Social Media", 
  video: "https://youtu.be/2mdzwmk7Q9c",
  icon: <RiTeamFill /> 
  },
  { 
    id: "design", 
    name: "Design", 
    icon: <GiTeacher /> 
  },
  { 
    id: "outreach", 
    name: "Outreach", 
    icon: <BiGroup /> 
  },


];

const DepartmentCard = ({ department }) => (
  <motion.Grid variants={item}>
    <Card
      css={{
        mw: "200px",
        minWidth: "200px",
        justifyContent: "center",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
        marginRight: "1rem",
      }}
      variant="bordered"
    >
      <Card.Body>
        <Text style={{textAlign: "center"}} size={25}>{department.icon}</Text>
        <Text size={18} style={{ margin: 0, alignItems: "center", textAlign: "center"}}>
          {department.name}
        </Text>
        <Grid.Container justify="space-around" marginTop="1rem">
          <Button
          as="a"
          href={department.video}
            isHoverable
            is
            style={{ margin: "20px" }}
            auto
            color="secondary"
            target="_blank"
            icon={<GiFireworkRocket />}
            disabled={department.video === undefined}
            
          >
           Onboarding 
          </Button>
          <Button
            auto
            color="primary"
            as="a"
            href={`/department/${department.id}`}
            target="_blank"
            icon={<BsBriefcase />}
          >
            Handbook
          </Button>
        </Grid.Container>
      </Card.Body>
    </Card>
  </motion.Grid>
);

const StaffHome = () => (
  <motion.div variants={container} initial="hidden" animate="show">
    <Grid.Container
      css={{ marginTop: "2rem", maxW: "80%", margin: "auto !important" }}
      gap={2}
      justify="center"
    >
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </Grid.Container>
  </motion.div>
);

export default StaffHome;
