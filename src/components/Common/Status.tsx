import { Tooltip } from '@mui/material'
import React from 'react'

export enum ORDER_STATUS {
  ORDER_PLACED = 'PLACED ',
  ORDER_CONFIRMED = 'CONFIRMED',
  ORDER_ASSIGNED = 'ASSIGNED',
  SAMPLE_COLLECTING = 'SAMPLE_COLLECTING',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  KIT_RECEIVED = 'KIT_RECEIVED',
  KIT_SUBMITTED = 'KIT_SUBMITTED',
  ORDER_COMPLETED = 'COMPLETED',
  ORDER_HOLD = 'HOLD',

  ORDER_STARTED = 'STARTED',

  ORDER_CANCELLED = 'CANCELLED',
}

const statusList = [
  {
    list: [
      'Active',
      'Closed',
      'CLOSED',
      'Interested',
      'ASSIGNED',
      'Paid',
      'PLACED',
      'Order Placed',
      'ORDER_PLACED',
      'CONFIRMED',
      'SAMPLE_COLLECTED',
      'COMPLETED',
    ],
    class: 'bg-LimeGreen text-[#3AC430]' ,
    hex: '#3AC430'
  },
  {
    list: ['In Progress', 'REFUNDED', 'CALL_BACK', 'IN_ACTIVE', 'HOLD', 'PENDING'],
    class: 'bg-YellowOrange text-[#FE9705]',
    hex: '#FE9705'
  },

  {
    list: [
      'Open',
      'OPEN',
      'Interested',
      'CONVERTED',
      'Inactive',
      'ASSIGNED',
      'KIT_SUBMITTED',
      'ASSIGNED_H',
      'ASSIGNED_H_P',
    ],
    class: 'bg-Azure text-[#0085FF]',
    hex: '#0085FF'
  },

  {
    list: ['DELIVERED'],
    class: 'bg-LimeGreen',
    hex: '#3AC430'

  },
  {
    list: ['SAMPLE_COLLECTING', 'KIT_RECEIVED', 'STARTED'],
    class: 'bg-VividYellow',
    hex: '#FEE505'
  },
]

const getBgClass = (status: string) => {
  let className = 'bg-GlowingBrakeDisc'
  for (const item of statusList) {
    if (item?.list.some((x) => x?.toLowerCase() === status?.toLowerCase())) {
      className = item?.class
      break
    }
  }

  return className
}

const getHexValue = (status: string) => {
  let colorHex = '#EF4949'
  for (const item of statusList) {
    if (item?.list.some((x) => x?.toLowerCase() === status?.toLowerCase())) {
      colorHex = item?.hex
      break
    }
  }

  return colorHex
}

interface Props {
  children: any,
  onClick?: any,
  isPointer?: Boolean,
  title?: any
}
const Status: React.FC<Props> = ({ children, onClick, title, isPointer }) => (
  <>
    {
      isPointer ? <Tooltip title={title}>
        <div
          onClick={onClick}
          className={`font-nunitoRegular ${isPointer ? 'cursor-pointer' : ''} ${getBgClass(
            children,
          )} bg-opacity-20 w-fit py-1.5 flex space-x-2 items-center pr-2 pl-2 rounded-[44px]`}
        >
          {/* <div className={`w-3 h-3 ${getBgClass(children)} rounded-md border-2 border-white`} /> */}
          <p
            className={`font-nunitoRegular font-bold ${getBgClass(children).replace(
              'bg-',
              'text-',
            )}  text-xs`}
          >
            {children}

          </p>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.375 6C1.375 8.554 3.4455 10.625 6 10.625C8.554 10.625 10.625 8.554 10.625 6C10.625 3.446 8.554 1.375 6 1.375C3.4455 1.375 1.375 3.446 1.375 6Z" stroke={getHexValue(children)} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.2644 5.27881L5.9999 7.02181L7.7354 5.27881" stroke={getHexValue(children)} stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

      </Tooltip> : <div
        onClick={onClick}
        className={`font-nunitoRegular ${isPointer ? 'cursor-pointer' : ''} ${getBgClass(
          children,
        )} bg-opacity-20 w-fit py-1.5 flex space-x-2 items-center pr-4 pl-2 rounded-[44px]`}
      >
        <div className={`w-3 h-3 ${getBgClass(children)} rounded-md border-2 border-white`} />
        <p
          className={`font-nunitoRegular font-bold ${getBgClass(children).replace(
            'bg-',
            'text-',
          )}  text-xs`}
        >
          {children}
        </p>
      </div>
    }
  </>
)

export default Status
