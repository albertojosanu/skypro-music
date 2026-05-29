'use client';

import { useParams } from 'next/navigation';
import Centerblock from '@/components/Centerblock/Centerblock';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  return <Centerblock id={params.id} />;
}
