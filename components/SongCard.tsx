import { SpotifyTrack } from "../types/track";
import { Button, Card, Image, Group, Text, Badge, useMantineTheme } from "@mantine/core";
import { Music } from "tabler-icons-react";
export default function SongCard({song, top}: {song: {track: SpotifyTrack}, top: number}) {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
      ? theme.colors.dark[1]
      : theme.colors.gray[7];

    return (
        <>
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={(song.track.album.images as any)[0].url} height={"auto"} width={"100%"} alt="Album cover" />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{song.track.name}</Text>
          <Badge color="pink" variant="light">
            {top}
          </Badge>
        </Group>


        <Button variant="light" component="a"  color="blue" fullWidth style={{ marginTop: 14 }} href={`https://open.spotify.com/track/${song.track.id}`}>
          <Music/> {"Listen on Spotify"}
        </Button>
      </Card>
    </div>
        </>
    )

}