// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type Data = {
  songs: {}[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const rawData = axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  })

  rawData.then(data => {
    res.status(200).json ({songs: data.data.tracks.items})
  })
}
