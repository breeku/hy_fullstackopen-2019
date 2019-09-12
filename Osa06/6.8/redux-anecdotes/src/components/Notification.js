import React from "react"
import { connect } from 'react-redux'
import { emptyNotification } from "../reducers/notificationReducer"

const Notification = (props) => {
    let notification = props.notification
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1
    }
    if (notification) {
        setTimeout(() => {
            props.emptyNotification()
        }, notification.duration * 1000)
    }
    return (
        <div style={style}>
            {notification ? (
                <div>{notification.message}</div>
            ) : (
                <div />
            )}
        </div>
    )
}

const mapStateToProps = state => {
  return {
      notification: state.notification
  }
}

const mapDispatchToProps = { emptyNotification }

const ConnectedNotifications = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default ConnectedNotifications
