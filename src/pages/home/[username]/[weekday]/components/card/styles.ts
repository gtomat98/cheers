import { keyframes, styled } from '@/styles'
import * as Accordion from '@radix-ui/react-accordion'
import { violet } from '@radix-ui/colors'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Checkbox from '@radix-ui/react-checkbox'

export const Li = styled('li', {
  listStyle: 'none',
})

export const AccordionRoot = styled(Accordion.Root, {
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  minWidth: 380,
  borderRadius: 4,
  boxSizing: 'border-box',
  listStyle: 'none',
  background: 'rgba(36, 32, 58, 0.65)',
  cursor: 'pointer',
  transition: 'background 200ms, border 200ms, opacity 200ms',
  padding: 32,

  img: {
    borderRadius: 10,
  },
})

export const AccordionItem = styled(Accordion.Item, {})

export const AccordionHeader = styled(Accordion.Header, {})

export const Container = styled('div', {})

export const HeaderContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  h3: {
    color: '$textTitle',
    fontFamily: 'Quicksand',
  },

  img: {
    zIndex: -2,
    opacity: 1,
    borderRadius: 99999999999,
    position: 'absolute',
    left: '0%',
    top: '0%',
    transform: 'translate(-30%, -30%)',
  },
})

export const FooterContainer = styled('div', {
  marginTop: 24,
  display: 'flex',
  justifyContent: 'center',
})

export const AccordionTrigger = styled(Accordion.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
})

export const StyledChevron = styled(ChevronDownIcon, {
  filter: 'contrast(120%) brightness(0.8) saturate(120%)',
  color: '$$color',
  width: 26,
  height: 26,
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1), color 200ms',

  '[data-state=open] &': { transform: 'rotate(180deg)' },

  '&:hover': {
    color: '$$tag',
  },
})

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

export const AccordionContent = styled(Accordion.Content, {
  marginTop: 24,
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${slideDown} 100ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 100ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
})

export const StyledContentText = styled('div', {
  padding: '15px 20px',
})

export const Meal = styled('li', {
  width: '100%',
  minWidth: 400,
  borderRadius: 4,
  boxSizing: 'border-box',
  listStyle: 'none',
  background: 'rgba(36, 32, 58, 0.65)',
  cursor: 'pointer',
  transition: 'background 200ms, border 200ms, opacity 200ms',
  padding: 32,

  display: 'flex',
  justifyContent: 'space-between',

  h3: {
    color: '$textTitle',
    fontFamily: 'Quicksand',
  },

  img: {
    borderRadius: 10,
  },
})

export const CheckboxRoot = styled(Checkbox.Root, {
  filter: 'contrast(120%) brightness(0.8) saturate(120%)',
  background: 'rgba(36, 32, 58, 0)',
  cursor: 'pointer',
  border: '2px solid $$color',
  width: 32,
  height: 32,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 100ms',

  '&:hover': {
    border: '2px solid $$tag',
  },

  '&[data-state="checked"]': {
    border: '2px solid $$tag',
  },
})

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$$tag',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  filter: 'contrast(120%) brightness(0.8) saturate(120%)',
})
