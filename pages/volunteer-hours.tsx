import type { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import { Nav } from "../components/navbar/navbar";
import { Layout } from "../components/navbar/layout";
import { Box } from "../components/styles/box";
import {
  Button,
  Input,
  Radio,
  Checkbox,
  Divider,
  Text,
  Textarea,
} from "@nextui-org/react";

const Volunteer: NextPage = () => {
  const [name, setName] = useState("");
  const [discord, setDiscord] = useState("");
  const [department, setDepartment] = useState("");
  const [task, setTask] = useState("");
  const [hours, setHours] = useState(0);
  const [otherOrg, setOtherOrg] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/sendVolunteerInfo', {
        name,
        discord,
        department,
        task,
        hours,
        otherOrg
      });

      if(res.data.success) {
        alert('Hours submitted successfully!');
      } else {
        alert('An error occurred, please try again.');
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Divider />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          margin: "3rem auto",
          paddingRight: "9em",
          paddingLeft: "9em",
          boxSizing: "border-box",
        }}
        as="main"
      >
        <Text css={{ mb: "2rem" }} h2>
          Volunteer Hours
        </Text>
        <Input 
          css={{ mb: "2rem" }} 
          color="primary" 
          clearable 
          bordered 
          label="Name" 
          required 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <Input 
          css={{ mb: "2rem" }} 
          color="primary" 
          clearable 
          bordered 
          label="Discord" 
          required 
          value={discord} 
          onChange={(e) => setDiscord(e.target.value)}
        />
        <Radio.Group 
          css={{ mb: "2rem" }} 
          label="Departments"
          value={department}
          onChange={(val) => setDepartment(val)}
        >
          <Radio value="Web Development Team">Web Development Team</Radio>
          <Radio value="Education Team">Education Team</Radio>
          <Radio value="HR Team">HR Team</Radio>
          <Radio value="Hackathon Committee">Hackathon Organizer</Radio>
          <Radio value="Marketing/Design Team">Marketing/Design Team</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
        <Textarea 
          css={{ mb: "2rem" }} 
          color="primary" 
          bordered 
          label="What task did you do?" 
          required 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
        />
        <Input 
          css={{ mb: "2rem" }} 
          color="primary" 
          clearable 
          bordered 
          type="number" 
          label="Hours for the task?" 
          required 
          value={hours} 
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <Checkbox 
          label="Do you have any hours from another organization?" 
          onChange={(checked) => setOtherOrg(checked)}
        />
        <Text css={{ mb: "2rem" }} h4>
          Send proof of volunteering in a Discord Ticket if necessary
        </Text>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Layout>
  );
};

export default Volunteer;
