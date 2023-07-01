import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from 'form-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { file, name, discord, department, task, hours, otherOrg } = req.body;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'c1isclgp');

    const isPDF = file.type === "application/pdf";
    const url = isPDF 
      ? 'https://api.cloudinary.com/v1_1/dfvsg4dek/raw/upload' 
      : 'https://api.cloudinary.com/v1_1/dfvsg4dek/image/upload';

    try {
      const response = await axios.post(url, formData, {
        headers: formData.getHeaders()
      });

      const fileUrl = response.data.secure_url;

      const webhookUrl = 'https://discord.com/api/webhooks/1124212516965326848/a8vQjZRBDofAEGAffqysVRrBdvJB4cTBPfA4p_DQxIpci_OwcOqFlxqG-ZafubEZBJqY';
      await axios.post(webhookUrl, {
        embeds: [{
          title: `Volunteer hours logged by ${name}`,
          fields: [
            {
              name: 'Discord',
              value: discord,
              inline: true,
            },
            {
              name: 'Department',
              value: department,
              inline: true,
            },
            {
              name: 'Task',
              value: task,
              inline: false,
            },
            {
              name: 'Hours',
              value: hours.toString(),
              inline: true,
            },
            {
              name: 'Other organization?',
              value: otherOrg ? 'Yes' : 'No',
              inline: true,
            },
          ],
          image: { url: fileUrl },
        }],
      });

      res.status(200).json({ message: 'Volunteer info and file sent successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed.' });
    }
  } else {
    res.status(405).json({ error: 'Invalid request method.' });
  }
}
