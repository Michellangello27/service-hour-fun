import React, { useState } from 'react'

export default function useUserLog() {

const [userLog, setUserLog] = useState("")
const [emailLog, setEmailLog] = useState("")


return [userLog, setUserLog, emailLog, setEmailLog]




 
}
