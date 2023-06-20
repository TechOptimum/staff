// pages/api/members.js

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  const filterRole = req.query.filter; // This is the role you want to filter by

  const rolesResponse = await fetch('https://discord.com/api/guilds/961850793202450432/roles', {
    headers: {
      'Authorization': `Bot MTA2NjkyNzY1NTA5NTYzNTk4OQ.GJlxu0.jUfMo_44i6L4pkTuJ9KJZyxhUEtXM8jzqEdAOU`,
      'Content-Type': 'application/json'
    }
  });
  
  const rolesData = await rolesResponse.json();
  const roles = Object.fromEntries(rolesData.map(role => [role.id, {name: role.name, position: role.position}]));

  const membersResponse = await fetch('https://discord.com/api/guilds/961850793202450432/members?limit=1000', {
    headers: {
      'Authorization': `Bot MTA2NjkyNzY1NTA5NTYzNTk4OQ.GJlxu0.jUfMo_44i6L4pkTuJ9KJZyxhUEtXM8jzqEdAOU`,
      'Content-Type': 'application/json'
    }
  });
  
  const membersData = await membersResponse.json();

  let members = membersData
    .filter(member => member.user.id !== '1093067580471787521' && !member.user.bot) // Ignore specific user and all bots
    .map(member => {
      // Find the role with the highest position
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
      };
    });

  // If filterRole is specified, filter out members that don't have the specified role
  if (filterRole) {
    members = members.filter(member => member.role.toLowerCase().replace(/\s+/g, '-') === filterRole.toLowerCase());
  }

  // Sort members by role position in descending order
  members = members.sort((a, b) => b.rolePosition - a.rolePosition);

  res.status(200).json(members);
}
