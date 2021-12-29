// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import buildQuery, { PageName } from '../../queries';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { pageName } = req.query;

  let response = await fetch('http://localhost:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: buildQuery(PageName.HomePage)
  });

  let data = await response.json();

  res.status(200).json(data.data.homePage.data);
}
