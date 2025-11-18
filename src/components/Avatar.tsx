import { forwardRef } from 'react'

import MuiAvatar from '@mui/material/Avatar'
import { lighten, styled } from '@mui/material/styles'
import type { AvatarProps } from '@mui/material/Avatar'
import { ThemeColor } from '../theme/themeBuilder'


export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor
  skin?: 'filled' | 'light'
  size?: number
}

const Avatar = styled(MuiAvatar)<CustomAvatarProps>(({ skin, color, size, theme }) => {
  return {
    ...(color &&
      skin === 'light' && {
        backgroundColor: lighten(theme.palette[color as ThemeColor].main, 0.14),
        color: theme.palette[color as ThemeColor].contrastText
      }),
    ...(color &&
      skin === 'filled' && {
        backgroundColor: lighten(theme.palette[color as ThemeColor].main, 1),
        color: theme.palette[color as ThemeColor].contrastText
      }),
    ...(size && {
      height: size,
      width: size
    })
  }
})

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>((props: CustomAvatarProps, ref) => {
  
  const { color, skin = 'filled', ...rest } = props

  return <Avatar color={color} skin={skin} ref={ref} {...rest} />
})

export default CustomAvatar
