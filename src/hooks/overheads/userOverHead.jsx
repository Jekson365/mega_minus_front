import React, { useEffect, useState } from 'react'
import instance from '../../api'

function userOverHead() {
    const [overhead, setOverHead] = useState()
    useEffect(() => {
        instance.get("/overheads", { headers: { Authorization: localStorage.getItem('token') } })
            .then((res) => {
                setOverHead(res.data)
            })
    }, [])

    return { overhead, setOverHead }
}

export default userOverHead