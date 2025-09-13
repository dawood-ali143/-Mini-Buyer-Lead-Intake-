'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buyerSchema } from './buyerValidator';
import { z } from 'zod';

type BuyerFormData = z.infer<typeof buyerSchema>;

export default function EditBuyerPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState<BuyerFormData | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
  });

  useEffect(() => {
    fetch(`/api/buyers/${params.id}`)
      .then(res => res.json())
      .then(data => {
        reset(data);
        setInitialData(data);
        setUpdatedAt(data.updatedAt);
      });
  }, [params.id, reset]);

  const onSubmit = async (data: BuyerFormData) => {
    setError(null);
    const res = await fetch(`/api/buyers/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, updatedAt }),
    });

    if (res.status === 409) {
      setError('Record changed, please refresh.');
    } else if (res.ok) {
      alert('Lead updated!');
    } else {
      setError('Update failed.');
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder="Full Name" />
      <input {...register('email')} placeholder="Email" />
      <input {...register('phone')} placeholder="Phone" />
      {/* Add other fields here */}
      <input type="hidden" value={updatedAt} />
      <button type="submit">Save</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}editBuyerPage.tsx
