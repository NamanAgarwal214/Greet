import React from 'react'

export default function FlashMessage({flashMessages}) {
  return (
    <div className="floating-alerts">
     {flashMessages.map((el, index) => {
				return (
					<div key={index} className={"alert text-center floating-alert shadow-sm " + (el.status ? "alert--success" : "alert--error")}>{el.message}</div>
				)
			})}
    </div>
  )
}
