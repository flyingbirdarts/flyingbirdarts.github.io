// A plain-Markdown summary of the site for AI assistants and agents (https://llmstxt.org).
// Built from the same content as the pages, so it stays current as collections change.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../site';

export const GET: APIRoute = async ({ site: origin }) => {
  const url = (path: string) => new URL(path, origin).href;
  const art = (await getCollection('art')).sort((a, b) => a.data.order - b.data.order);
  const albums = (await getCollection('albums')).sort((a, b) => a.data.order - b.data.order);

  const artLines = art.map(({ id, data }) => {
    if (data.featured) {
      const work = data.paintings[0];
      const details = [work.material, work.dimensions && `${work.dimensions} in`].filter(Boolean).join(', ');
      return `- [${data.title}](${url(`/gallery/${id}/`)}): a single featured painting (${details}) with its story and close-up details. Prints are available.`;
    }
    return `- [${data.title}](${url(`/gallery/${id}/`)}): ${data.paintings.length} paintings, each with title, medium and size`;
  });

  const albumLines = albums.map(({ id, data }) => {
    const spotify = data.spotifyAlbumId ? `; also on Spotify (https://open.spotify.com/album/${data.spotifyAlbumId})` : '';
    return `- [${data.title}](${url(`/music/${id}/`)}): ${data.label}. ${data.tracks.length} preview tracks: ${data.tracks.map((t) => t.title).join('; ')}${spotify}`;
  });

  const body = `# ${site.title}

> ${site.description}

Paul Alexandre John was born in Calcutta, India in 1952 to Armenian parents. He studied the Indian bansuri (bamboo flute) under Pundit Gour Goswami, trained in fine arts at Claremont Art School in Australia, and has lived and worked in the United States since 1981, now in rural Maine. His paintings range across allegorical, baseball, carpet, mountain, ocean and religious themes; he has recorded three albums of Indian classical flute music.

## Art

${artLines.join('\n')}

## Music

${albumLines.join('\n')}

## About

- [Biography](${url('/about/')}): life, training and career as a painter and flutist

## Contact

- Prints and questions about paintings: ${site.email}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
