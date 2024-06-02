import { cn } from '@/lib/utils'
import ReCaptcha from 'react-google-recaptcha'
import { CAPTCHA_SITE_KEY } from '@/constants'
import { FocusEventHandler } from 'react'

type Props = {
  className?: string
  error?: string
  onChange?: (token: string | null) => void
  onBlur?: FocusEventHandler<HTMLDivElement>
}

export const FieldCaptcha = ({ onChange, onBlur, error, className }: Props) => {
  return (
    <div className={className}>
      <ReCaptcha
        theme="light"
        className="relative -left-2"
        onChange={onChange}
        onBlur={onBlur}
        sitekey={CAPTCHA_SITE_KEY}
        hl="en"
      />
      <span className={cn('mt-1 break-words text-center text-red-600', error ? 'block' : 'hidden')}>{error}</span>
    </div>
  )
}
