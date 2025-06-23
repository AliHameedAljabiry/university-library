"use client";
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth';
import { singUpSchema } from '@/lib/validations'

import React from 'react'

const Page = () => {
  return (
    <>
      <AuthForm 
        type="SIGN_UP"
        schema={singUpSchema}
        defaultValues={{ email: '', password: '', fullName: '', universityId: 0, universityCard: '' }}
        onSubmit={signUp}
      />
    </>
  )
}

export default Page
