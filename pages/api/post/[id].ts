import { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery, postDetailQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    if (req.method === 'GET') {
        const { id } = req.query;
        console.log('nextjs backend. post id received:', id);
        if(id) {
            const query = postDetailQuery(id);
            const data = await client.fetch(query);

            return res.status(200).json(data[0]);
        }
        return res.status(400).json({status: 'Error', Message: 'Post Id not provided'});
    }
}