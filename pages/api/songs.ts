// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
  songs: {}[];
};

var CacheData: {
  timestamp: number;
  data: Data;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //TODO: handle real API requests and avoid rate limits
  function returnFetchData() {
    const rawData = axios({
      method: "get",
      url: "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      },
    });

    rawData.then((data) => {
      CacheData = {
        timestamp: Date.now(),
        data: { songs: data.data.tracks.items },
      };
      res.status(200).json({ songs: data.data.tracks.items });
    });
  }
  function returnFreezedData() {
    const backup = require("../../data/backup/songs.json");

    res.status(200).json({ songs: backup.songs });
  }
  function returnCacheData() {
    res.status(200).json(CacheData.data);
  }
  // check if some hours passed from the last fetch, if not return chaed data else return new data if there is any error, return backup data
  try {
    if (!CacheData || CacheData.timestamp + 10800000 < Date.now()) {
      returnFetchData();
    } else {
      returnCacheData();
    }
  } catch (error) {
    returnFreezedData();
  }
}
