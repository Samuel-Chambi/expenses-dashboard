import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignUpForm } from '@/features/auth/components/sign-up-form'

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Create Account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  )
}
