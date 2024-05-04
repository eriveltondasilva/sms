import AuthLayout from '@/Layouts/AuthLayout'

import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

import { breadcrumbs, titles } from './data'

// ============================================================================
export default function ProfileEditPage({ mustVerifyEmail, status }) {
  return (
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
  )
}

// ------------------------------------
ProfileEditPage.layout = (page) => (
  <AuthLayout title={titles.profile} breadcrumb={breadcrumbs.profile}>
    {page}
  </AuthLayout>
)
