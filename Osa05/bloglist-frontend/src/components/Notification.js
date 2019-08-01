import React from "react"
import "../css/notification.css"

const Notification = ({errorMsg, setErrorMsg, successMsg, setSuccessMsg}) => {
    setTimeout(() => {
        setErrorMsg("")
        setSuccessMsg("")
    }, 5000);
    if (successMsg !== "") {
        return (
            <div className="success">
            <p>{successMsg}</p>
        </div>
        )
    } else if (errorMsg !== "") {
        return (
            <div className="error">
            <p>{errorMsg}</p>
        </div>
        )
    } else if (errorMsg === "" && successMsg === "") {
        return (
            null
        )
    }
}

export default Notification
