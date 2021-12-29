import type { NextApiRequest, NextApiResponse } from 'next';
import HomePageConfig from '../homePageData';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { pageName } = req.query;

  let pageData;

  switch (pageName) {
    case 'homePage':
      pageData = HomePageConfig;
      break;
    default:
      pageData = HomePageConfig;
  }

  res.status(200).json(pageData);
}
