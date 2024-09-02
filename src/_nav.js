import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook  } from '@fortawesome/free-solid-svg-icons'


const _nav = [
  
  {
    component: CNavItem,
    name: 'Add Books Page',
    to: '/AddBooks',
    icon: <FontAwesomeIcon icon={faBook} style={{ color: '#ae6aaf', fontSize: '1.5rem', marginRight: '0.5rem' }} />,
    badge: {
      color: 'info',
      
    },
  },

  {
    component: CNavItem,
    name: 'View Books Page',
    to: '/ViewBooks',
    icon: <FontAwesomeIcon icon={faBook} style={{ color: '#90b52c', fontSize: '1.5rem', marginRight: '0.5rem' }} />,
    badge: {
      color: 'info',
      
    },
  },

  {
    component: CNavItem,
    name: 'Update Books',
    to: '/UpdateBooks',
    icon: <FontAwesomeIcon icon={faBook} style={{ color: '#64a9d3', fontSize: '1.5rem', marginRight: '0.5rem' }} />,
    badge: {
      color: 'info',
      
    },
  },

  
  {
    component: CNavItem,
    name: 'Delete Books',
    to: '/DeleteBooks',
    icon: <FontAwesomeIcon icon={faBook} style={{ color: '#d1af33', fontSize: '1.5rem', marginRight: '0.5rem' }} />,
    badge: {
      color: 'info',
      
    },
  },
 
]

export default _nav
