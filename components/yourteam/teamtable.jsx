import { useState, useEffect } from 'react';
import { Center, Table, Pagination } from '@nextui-org/react';

export default function Teamtable() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 9;

  useEffect(() => {
    fetch('/api/members')
    .then(response => response.json())
    .then(data => setTeamMembers(data))
    .catch(error => console.error('Error:', error));
  }, []);

  const displayedMembers = teamMembers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div >
    <Table
      striped
      shadow={false}
      color="secondary"
      aria-label="Example pagination  table"
      css={{ 
        minWidth: '80%', // This makes the table less wide. You can adjust the value as needed.
        margin: '0 auto', // This centers the table horizontally.
      }}
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>USERNAME</Table.Column>
        <Table.Column>ROLE</Table.Column>
      </Table.Header>
      <Table.Body>
        {displayedMembers.map((member, index) => (
          <Table.Row key={index}>
            <Table.Cell>{member.name}</Table.Cell>
            <Table.Cell>{`${member.user.username}#${member.user.discriminator}`}</Table.Cell>
            <Table.Cell>{member.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Table.Pagination
      loop
      shadow
      color="primary"
      total={Math.ceil(teamMembers.length / rowsPerPage)}
      value={page}
      align="center"
      onChange={(newPage) => setPage(newPage)}
    />
  </div>
  );
}
