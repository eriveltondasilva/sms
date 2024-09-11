export type LoginProps = {
  status: string
  canResetPassword: boolean
}

export type ForgotPasswordProps = {
  status: string
}

export type ResetPasswordProps = {
  token: string
  email: string
}

export type VerifyEmailProps = {
  status: string
}
