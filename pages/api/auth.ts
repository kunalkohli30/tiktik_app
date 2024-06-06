import { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery } from "../../utils/queries";
import { client } from "../../utils/client";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {
        
        const user = req.body;
        console.log('Create user if not exists request received. User:', user);

        client.createIfNotExists(user)
            .then(() => res.status(200).json('Login Success'));
    }

}