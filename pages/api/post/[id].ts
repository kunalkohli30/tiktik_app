import { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery, postDetailQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";
import { uuid } from "uuidv4";
import postedBy from "../../../sanity/schemas/postedBy";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    if (req.method === 'GET') {
        const { id } = req.query;
        console.log('nextjs backend. post id received:', id);
        if (id) {
            const query = postDetailQuery(id);
            const data = await client.fetch(query);

            return res.status(200).json(data[0]);
        }
        return res.status(400).json({ status: 'Error', Message: 'Post Id not provided' });
    } else if (req.method === 'PUT') {
        const { comment, userId } = req.body;
        const { id }: any = req.query;
        console.log('request received')
        const data = await client
            .patch(id)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [
                {
                    comment,
                    _key: uuid(),
                    postedBy: { _type: 'postedBy', _ref: userId }
                }
            ])
            .commit();

        res.status(200).json(data);
    }
}