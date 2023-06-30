import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, discord, department, task, hours, otherOrg } = req.body;

    try {
      // Discord webhook URL
      const url =
        "https://discord.com/api/webhooks/1124212516965326848/a8vQjZRBDofAEGAffqysVRrBdvJB4cTBPfA4p_DQxIpci_OwcOqFlxqG-ZafubEZBJqY";

      const result = await axios.post(url, {
        embeds: [
          {
            title: `Volunteer hours logged by ${name}`,
            fields: [
              {
                name: "Discord",
                value: discord,
                inline: true,
              },
              {
                name: "Department",
                value: department,
                inline: true,
              },
              {
                name: "Task",
                value: task,
                inline: false,
              },
              {
                name: "Hours",
                value: hours.toString(),
                inline: true,
              },
              {
                name: "Any hours from other organization?",
                value: otherOrg ? "Yes" : "No",
                inline: true,
              },
            ],
          },
        ],
      });

      if (result.status === 204) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ success: false });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
