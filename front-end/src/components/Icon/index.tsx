import { IconsName } from '@/common/common.type'
import type { LucideProps } from 'lucide-react'
import * as icons from 'lucide-react'
import EmptyComponent from '../EmptyComponent'

export interface IIconProps extends LucideProps {
  iconName: IconsName
}

export default function Icon({ iconName, ...rest }: IIconProps) {
  const LucideIcon = iconName ? icons[iconName] : EmptyComponent
  return <LucideIcon {...rest} />
}
