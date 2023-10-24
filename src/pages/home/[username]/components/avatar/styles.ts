import { styled, keyframes } from '@/styles'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { violet, mauve } from '@radix-ui/colors'

export const AvatarRoot = styled(Avatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 44,
  height: 44,
  borderRadius: '100%',
  backgroundColor: 'white',
  cursor: 'pointer',
  outline: '2px solid $white',
  outlineOffset: '3px',

  '@media (max-width: 500px)': {
    width: 40,
    height: 40,
  },

  '@media (max-width: 320px)': {
    width: 30,
    height: 30,
  },

  img: {
    color: '$baseBox',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },
})

export const AvatarImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

export const AvatarFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: '',
  fontSize: '15px',
  lineHeight: 1,
  fontWeight: 500,

  '@media (max-width: 320px)': {
    fontSize: '10px',
  },
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const contentStyles = {
  zIndex: 100000000000,
  minWidth: 180,
  background: 'rgba(255, 255, 255, 0.025)',
  backdropFilter: 'blur(10px)',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
}

export const DropdownMenuContent = styled(DropdownMenu.Content, contentStyles)
export const DropdownMenuSubContent = styled(
  DropdownMenu.SubContent,
  contentStyles,
)

export const DropdownMenuGroup = styled(DropdownMenu.Group, {})

export const DropdownMenuArrow = styled(DropdownMenu.Arrow, {
  fill: 'white',
})

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: mauve.mauve5,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 30,
  padding: '0 10px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve10,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    cursor: 'pointer',
    backgroundColor: 'rgba(62, 54, 128, 0.5)',
    color: violet.violet1,
  },
}

export const DropdownMenuItem = styled(DropdownMenu.Item, itemStyles)
export const DropdownMenuCheckboxItem = styled(
  DropdownMenu.CheckboxItem,
  itemStyles,
)
export const DropdownMenuRadioItem = styled(DropdownMenu.RadioItem, itemStyles)
export const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: violet.violet4,
    color: violet.violet11,
  },
  ...itemStyles,
})

export const DropdownMenuLabel = styled(DropdownMenu.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
})

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
})

export const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: mauve.mauve8,
  '[data-highlighted] > &': { color: 'white' },
  '[data-disabled] &': { color: mauve.mauve10 },
})
