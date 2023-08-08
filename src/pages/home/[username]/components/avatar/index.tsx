import {
  AvatarFallback,
  AvatarRoot,
  AvatarImage,
  DropdownMenuContent,
  DropdownMenuItem,
  RightSlot,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuArrow,
} from './styles'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'

interface AvatarTypes {
  src: string
  signOut: () => void
}

export default function Avatar({ src, signOut }: AvatarTypes) {
  function releaseSignOut() {
    if (signOut) {
      signOut()
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <AvatarRoot>
          <AvatarImage src={src} />
          <AvatarFallback delayMs={600}>US</AvatarFallback>
        </AvatarRoot>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem
            onClick={() => {
              releaseSignOut()
            }}
          >
            Sair da conta
          </DropdownMenuItem>
          <DropdownMenuItem>
            Alterar informações <RightSlot>⌘+N</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            Apagar conta <RightSlot>⇧+⌘+N</RightSlot>
          </DropdownMenuItem>
          {/* <DropdownMenu.Sub>
            <DropdownMenuSubTrigger>
              More Tools
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuSubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenuSubContent sideOffset={3} alignOffset={-5}>
                <DropdownMenuItem>
                  Save Page As… <RightSlot>⌘+S</RightSlot>
                </DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
                <DropdownMenuItem>Name Window…</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Developer Tools</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub> */}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
