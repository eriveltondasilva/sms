import { AuthLayout } from '@/Layouts/AuthLayout'

import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

import { breadcrumbs, titles } from './data'
import type { ProfileEditProps } from './types'

export default function ProfileEdit({
  mustVerifyEmail,
  status,
}: ProfileEditProps) {
  return (
    <AuthLayout
      title={titles.profile}
      breadcrumb={breadcrumbs.profile}
    >
      <div className='mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8'>
        <div className='p-4 sm:rounded-lg sm:p-8'>
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className='max-w-xl'
          />
        </div>

        <div className='p-4 sm:rounded-lg sm:p-8'>
          <UpdatePasswordForm className='max-w-xl' />
        </div>

        {/* TODO: deletar conta */}
        {/* <div className='p-4 sm:rounded-lg sm:p-8'>
        <DeleteUserForm className='max-w-xl' />
      </div> */}
      </div>
    </AuthLayout>
  )
}
