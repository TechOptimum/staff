import { useState, useEffect } from "react";
import { Input, Table, Pagination, User, Grid, Text } from "@nextui-org/react";

export default function Teamtable() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const rowsPerPage = 9;

  useEffect(() => {
    fetchMembers();
  }, [nameFilter, roleFilter]);

  const fetchMembers = () => {
    const params = new URLSearchParams();

    if (nameFilter) params.append("name", nameFilter);
    if (roleFilter) params.append("role", roleFilter);

    fetch(`/api/members?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error("Error:", error));
  };

  const displayedMembers = teamMembers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "0 auto",
        padding: "1em",
        boxSizing: "border-box",
      }}
    >
      <Text style={{ marginBottom: "20px" }} h1>
        Tech Optimum Team
      </Text>
      <Grid.Container justify="center">
        <Input
          clearable
          underlined
          labelPlaceholder="Filter by Name"
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
          color="primary"
        />{" "}
        <Input
          clearable
          underlined
          labelPlaceholder="Filter by Role"
          type="text"
          value={roleFilter}
          onChange={handleRoleFilterChange}
          color="primary"
        />{" "}
      </Grid.Container>
      <div style={{ overflowX: "auto", padding: "1rem 0" }}>
        <Table
          striped
          sticked
          shadow={false}
          color="secondary"
          aria-label="Example pagination table"
        >
          <Table.Header>
            <Table.Column>NAME </Table.Column>
            <Table.Column>ROLE </Table.Column>
            <Table.Column>JOINED AT</Table.Column>
          </Table.Header>
          <Table.Body>
            {displayedMembers.map((member, index) => (
              <Table.Row key={index}>
                <Table.Cell css={{ paddingRight: "4rem" }}>
                  <User
                  showSkeleton
                    name={member.name}
                    description={`${member.user.username}`}
                    bordered
                    color="blue"
                    src={
                      member.user.avatar
                        ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
                        : "https://www.techoptimum.org/logo-transparent.png"
                    }
                  />
                </Table.Cell>
                <Table.Cell css={{ paddingRight: "4rem" }}>
                  {member.role}
                </Table.Cell>
                <Table.Cell>
                  {new Date(member.joinedAt).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Pagination
        css={{
          margin: "0 auto",
          alignContent: "center",
          justifyContent: "center",
        }}
        loop
        shadow
        color="primary"
        total={Math.ceil(teamMembers.length / rowsPerPage)}
        value={page}
        align="center"
        onChange={handlePaginationChange}
      />
    </div>
  );
}
