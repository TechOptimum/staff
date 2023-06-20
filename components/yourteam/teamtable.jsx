import { useState, useEffect } from "react";
import { Center, Table, Pagination, User, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Teamtable() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const rowsPerPage = 9;

  const router = useRouter();

  useEffect(() => {
    fetchMembers();
  }, [nameFilter, roleFilter, departmentFilter]);

  const fetchMembers = () => {
    const params = new URLSearchParams();

    if (nameFilter) params.append("name", nameFilter);
    if (roleFilter) params.append("role", roleFilter);
    if (departmentFilter) params.append("department", departmentFilter);

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

  const handleDepartmentFilterChange = (selectedItems) => {
    const selectedDepartment = selectedItems[selectedItems.length - 1];
    setDepartmentFilter(selectedDepartment.value);
  };

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div
      css={{
        margin: "0 auto",
        alignContent: "center",
        justifyContent: "center",
        width: "50%",
        maxWidth: "100%",
      }}
    >
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <input
        type="text"
        placeholder="Filter by role"
        value={roleFilter}
        onChange={handleRoleFilterChange}
      />
      <Dropdown
        searchable
        clearable
        placeholder="Select Department"
        selected={departmentFilter ? [departmentFilter] : []}
        onChange={handleDepartmentFilterChange}
      >
        <Dropdown.Item value="web_development_team">
          Web Development Team
        </Dropdown.Item>
        <Dropdown.Item value="hr_team">HR Team</Dropdown.Item>
        {/* Add more department options here */}
      </Dropdown>

      <Table
        striped
        shadow={false}
        color="secondary"
        aria-label="Example pagination table"
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>ROLE</Table.Column>
          <Table.Column>JOINED AT</Table.Column>
        </Table.Header>
        <Table.Body>
          {displayedMembers.map((member, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <User
                  name={member.name}
                  description={`${member.user.username}#${member.user.discriminator}`}
                  bordered
                  color="blue"
                  src={`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`}
                />
              </Table.Cell>
              <Table.Cell>{member.role}</Table.Cell>
              <Table.Cell>
                {new Date(member.joinedAt).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
