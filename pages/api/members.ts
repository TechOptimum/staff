import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const nameFilter = req.query.name;

  const membersResponse = await fetch('https://slack.com/api/users.list', {
    headers: {
      'Authorization': `Bearer xoxb-5675819568358-5720583605328-tvyeQCi0juI4C2tj8Jdo21GO`,
      'Content-Type': 'application/json'
    }
  });
  const membersData = await membersResponse.json();
  if (!membersData.ok) {
    return res.status(400).json({ error: membersData.error });
  }

  const userGroupsResponse = await fetch('https://slack.com/api/usergroups.list', {
    headers: {
      'Authorization': `Bearer xoxb-5675819568358-5720583605328-tvyeQCi0juI4C2tj8Jdo21GO`,
      'Content-Type': 'application/json'
    }
  });
  const userGroupsData = await userGroupsResponse.json();
  if (!userGroupsData.ok) {
    return res.status(400).json({ error: userGroupsData.error });
  }
  const userGroups = userGroupsData.usergroups;

  let groupUsersMap = {};
  for (let group of userGroups) {
    const groupUsersResponse = await fetch(`https://slack.com/api/usergroups.users.list?usergroup=${group.id}`, {
      headers: {
        'Authorization': `Bearer xoxb-5675819568358-5720583605328-tvyeQCi0juI4C2tj8Jdo21GO`,
        'Content-Type': 'application/json'
      }
    });
    const groupUsersData = await groupUsersResponse.json();
    if (groupUsersData.ok) {
      groupUsersMap[group.id] = groupUsersData.users;
    }
  }

  let members = membersData.members
    .filter(member => !member.is_bot && !member.deleted && member.name !== "slackbot")
    .map(member => {
      let role = "member";
      for (let group of userGroups) {
        if (groupUsersMap[group.id] && groupUsersMap[group.id].includes(member.id)) {
          role = group.name;
          break;
        }
      }

      return {
        id: member.id,
        name: member.name,
        real_name: member.real_name,
        email: member.profile.email,
        role: role,
        image: member.profile.image_192
      };
    });

  members.sort((a, b) => {
    const priorityOrder = ['Executives', 'Administration Team', 'admin'];
    const aPriority = priorityOrder.indexOf(a.role);
    const bPriority = priorityOrder.indexOf(b.role);
    
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }
    
    if (aPriority !== -1) {
      return -1;
    }
    if (bPriority !== -1) {
      return 1;
    }
    
    return 0;
  });

  if (nameFilter) {
    const searchString = Array.isArray(nameFilter) ? nameFilter[0] : nameFilter;
    members = members.filter(member => member.name.includes(searchString));
  }

  res.status(200).json(members);
}
