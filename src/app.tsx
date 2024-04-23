import {MouseEvent} from 'react'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'

import {Dialog, useDialog} from './dialog'
import {openInNewTab, openInNewWindow} from './utils'

export function App() {
  return (
    <Routes>
      <Route path="/" Component={Environments} />
      <Route path="modeling" Component={Modeling} />
    </Routes>
  )
}

function Modeling() {
  return (
    <div>
      <h1>Modeling</h1>
      <hr />
      <Link to="..">Environments</Link>
    </div>
  )
}

function Environments() {
  return (
    <div>
      <h1>Environments</h1>
      <hr />
      <ModelingLink />
    </div>
  )
}

function ModelingLink() {
  const dialog = useDialog()
  const navigate = useNavigate()

  const onClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget
    event.preventDefault()

    if (await canGoToModeling()) {
      const shouldOpenInNewTab = event.ctrlKey || event.metaKey
      const shouldOpenInNewWindow = event.shiftKey
      const url = target.getAttribute('href')!

      if (shouldOpenInNewTab) openInNewTab(url)
      else if (shouldOpenInNewWindow) openInNewWindow(url)
      else navigate(url)
    } else {
      dialog.open()
    }
  }

  return (
    <>
      <Link to="modeling" onClick={onClick}>
        Modeling
      </Link>

      <Dialog {...dialog}>
        <h2>Modeling not available</h2>
        <hr />
        <p>Please, come back later</p>
      </Dialog>
    </>
  )
}

/**
 * Fake logic for allowing to go to modeling page
 */
async function canGoToModeling() {
  return Math.random() > 0.5
}
