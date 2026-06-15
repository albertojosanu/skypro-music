import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelection, getTracks } from '@/services/tracks/trackApi';

type CategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const [tracks, selection] = await Promise.all([
    getTracks(),
    getSelection(id),
  ]);
  const playlist = tracks.filter((track) =>
    selection.items.includes(track._id),
  );

  return <Centerblock tracks={playlist} title={selection.name} />;
}
