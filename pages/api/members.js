// pages/api/members.js

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  const nameFilter = req.query.name;
  const roleFilter = req.query.role;
  const departmentFilter = req.query.department;

  const rolesResponse = await fetch('https://discord.com/api/guilds/961850793202450432/roles', {
    headers: {
      'Authorization': `Bot MTA2NjkyNzY1NTA5NTYzNTk4OQ.GJlxu0.jUfMo_44i6L4pkTuJ9KJZyxhUEtXM8jzqEdAOU`,
      'Content-Type': 'application/json'
    }
  });

  const rolesData = await rolesResponse.json();
  const roles = Object.fromEntries(rolesData.map(role => [role.id, { name: role.name, position: role.position }]));

  const membersResponse = await fetch('https://discord.com/api/guilds/961850793202450432/members?limit=1000', {
    headers: {
      'Authorization': `Bot MTA2NjkyNzY1NTA5NTYzNTk4OQ.GJlxu0.jUfMo_44i6L4pkTuJ9KJZyxhUEtXM8jzqEdAOU`,
      'Content-Type': 'application/json'
    }
  });

  const membersData = await membersResponse.json();

  let members = membersData
    .filter(member => member.user.id !== '1093067580471787521' && !member.user.bot)
    .map(member => {
      let highestRole = member.roles.reduce((highest, roleId) => {
        const role = roles[roleId];
        if (!role) return highest;
        return (!highest || highest.position < role.position) ? role : highest;
      }, null);

      return {
        ...member,
        role: highestRole ? highestRole.name : 'No role',
        rolePosition: highestRole ? highestRole.position : -1,
        name: member.nick ? member.nick : member.user.username,
        joinedAt: member.joined_at,
        department: member.department // Assuming you have a department property in your data
      };
    });

  // Apply filters
  if (nameFilter) {
    members = members.filter(member => member.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  if (roleFilter) {
    members = members.filter(member => member.role.toLowerCase().includes(roleFilter.toLowerCase()));
  }

  if (departmentFilter) {
    members = members.filter(member => member.department.toLowerCase() === departmentFilter.toLowerCase());
  }

  // Sort members by role position in descending order
  members = members.sort((a, b) => b.rolePosition - a.rolePosition);

  res.status(200).json(members);
}
