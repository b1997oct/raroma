"use client"
import React, { useState } from 'react'
import { Drawer, IconButton } from 'rsuite'
import MenuIcon from '@rsuite/icons/Menu';

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='md:hidden'>
      <IconButton icon={<MenuIcon />} onClick={() => setOpen(true)} />
      <Drawer style={{ width: "80vw" }} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Rarome</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {children}
        </Drawer.Body>
      </Drawer>
    </div>
  )
}
