import { EEmployeeRole } from 'adealer-types'

export type Endpoint = {
  href: string
  title: string
  roles?: EEmployeeRole[]
}
