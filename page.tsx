'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buyerSchema } from '@/lib/validation/buyer';
import { z } from 'zod';

export default function NewBuyerPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof buyerSchema>>({
    resolver: zodResolver(buyerSchema)
  });

  const onSubmit = async (data: any) => {
    await fetch('/api/buyers', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  const propertyType = watch('propertyType');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder="Full Name" />
      <input {...register('email')} placeholder="Email" />
      <input {...register('phone')} placeholder="Phone" />
      <select {...register('city')}>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Mohali">Mohali</option>
        <option value="Zirakpur">Zirakpur</option>
        <option value="Panchkula">Panchkula</option>
        <option value="Other">Other</option>
      </select>
      <select {...register('propertyType')}>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Plot">Plot</option>
        <option value="Office">Office</option>
        <option value="Retail">Retail</option>
      </select>
      {['Apartment', 'Villa'].includes(propertyType) && (
        <select {...register('bhk')}>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4 BHK</option>
          <option value="Studio">Studio</option>
        </select>
      )}
      {/* Add rest of the fields similarly */}
      <button type="submit">Create Lead</button>
    </form>
  );
}
