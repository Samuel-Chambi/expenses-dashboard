import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignInForm } from '@/features/auth/components/sign-in-form'

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
