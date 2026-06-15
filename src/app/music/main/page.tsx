import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracks } from '@/services/tracks/trackApi';

export default async function Home() {
  const tracks = await getTracks();

  return <Centerblock tracks={tracks} />;
}
