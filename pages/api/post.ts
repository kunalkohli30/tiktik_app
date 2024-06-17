import { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery } from "../../utils/queries";
import { client } from "../../utils/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {pid} = req.query;
    // console.log('nextjs backend. post id received:', pid);
}