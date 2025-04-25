import { message, superValidate } from 'sveltekit-superforms';
import { yup } from 'sveltekit-superforms/adapters';
import { object, string } from 'yup';
import type { RequestEvent } from '@sveltejs/kit';

const schema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string().min(6, 'Password too short').required('Password is required')
});

export const load = async () => {
  // Add error handling for superValidate
  try {
    const form = await superValidate(yup(schema));
    return { form };
  } catch (error) {
    console.error('superValidate error:', error);
    throw error;
  }
};

export const actions = {
  default: async ({ request }: RequestEvent) => {
    try {
      const form = await superValidate(request, yup(schema));
      
      if (!form.valid) {
        return { form };
      }

      if (form.data.email === 'haw104@ucsd.edu' && form.data.password === '1234567') {
        console.log('✅ Login successful!');
      } else {
        form.errors = { 
          ...form.errors,
          email: ['Invalid credentials'],
          password: ['Invalid credentials']
        };
      }

      return message(form, "success");
    } catch (error) {
      console.error('Action error:', error);
      throw error;
    }
  }
};