import { Title, Text, Container, Center, Stack } from '@mantine/core';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { BrandGithub } from 'tabler-icons-react';
import SongCard from '../components/SongCard';
import useStyles from '../styles/index.styles'
const Home: NextPage = () => {
  const {classes} = useStyles()
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/songs')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return( <>
        <Title className={classes.title} align="center" mt={100} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text inherit variant="gradient" component="span" gradient={{ from: "#1DB954", to: "#191414"}}>
          Loading...
        </Text>
      </Title>
  </>)
  if (!data) return <p>Error fetching data</p>
  const songs = (data as any).songs
  //return (JSON.stringify(songs[0]))
  return (
    <>
    <Container style={{
      marginBottom: "30px"
    }}>
      <Title className={classes.title} align="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: "#1DB954", to: "#191414"}}>
          Top Spotify Songs
        </Text>
      </Title>
      </Container>

      <Container>
        <Center>
          <Stack>
          <SongCard song={songs[0]} top={1}/>
          <SongCard song={songs[1]} top={2}/>
          <SongCard song={songs[2]} top={3}/>
          <SongCard song={songs[3]} top={4}/>
          <SongCard song={songs[4]} top={5}/>
          <SongCard song={songs[5]} top={6}/>
          <SongCard song={songs[6]} top={7}/>
          <SongCard song={songs[7]} top={8}/>
          <SongCard song={songs[8]} top={9}/>
          <SongCard song={songs[9]} top={10}/>
          </Stack>
          
        </Center>
      </Container>

      <a href='https://github.com/victorioxd/top-songs' className='repolink'><BrandGithub /></a>
    </>
  )
}

export default Home
