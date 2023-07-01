import type { NextPage } from "next";
import { useState } from "react";
import { Nav } from "../components/navbar/navbar";
import { Layout } from "../components/navbar/layout";
import { Box } from "../components/styles/box";
import axios from "axios";
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
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [discord, setDiscord] = useState("");
  const [department, setDepartment] = useState("");
  const [task, setTask] = useState("");
  const [hours, setHours] = useState(0);
  const [otherOrg, setOtherOrg] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // Call handleFileUpload when the form is submitted
    const fileInput = document.querySelector("#file-upload");
    if (fileInput) {
      handleFileUpload({
        target: fileInput,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("name", name);
    formData.append("discord", discord);
    formData.append("department", department);
    formData.append("task", task);
    formData.append("hours", hours.toString());
    formData.append("otherOrg", otherOrg.toString());

    try {
      await axios.post("/api/sendVolunteerInfo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Clear form fields or handle response as needed
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <Layout>
      <Divider />
      <Box
        as="form"
        onSubmit={handleFormSubmit}
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
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          css={{ mb: "2rem" }}
          status="primary"
          clearable
          bordered
          label="Discord"
          required
          onChange={(e) => setDiscord(e.target.value)}
        />
        <Radio.Group
          css={{ mb: "2rem" }}
          label="Departments"
          onChange={(val: any) => setDepartment(val.target)}
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
          status="primary"
          bordered
          label="What task did you do?"
          required
          onChange={(e) => setTask(e.target.value)}
        />
        <Input
          css={{ mb: "2rem" }}
          status="primary"
          clearable
          bordered
          type="number"
          label="Hours for the task?"
          required
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <Checkbox
          label="Do you have any hours from another organization?"
          onChange={setOtherOrg}
        />
        <input
          id="file-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload} // This is where the change happens
        />
        <Text css={{ mb: "2rem" }} h4>
          Upload proof of your hours from another organization here (optional){" "}
          <i>.jpg,.jpeg,.png,.pdf</i>
        </Text>
        <Button type="submit">Submit</Button>
      </Box>
    </Layout>
  );
};

export default Volunteer;
