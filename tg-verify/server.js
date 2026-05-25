const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())


const BOT_TOKEN = "8029588619:AAGVnUpr9OQaH5SwrHJB7GzfZOdfrHYQsi0"
const CHAT_ID = "-1003761096798"


app.get("/", (req, res) => {

    res.send(`

    <!DOCTYPE html>

    <html>

    <head>

        <title>TG Verify</title>

        <style>

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            body{
                background:#0f0f0f;
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                font-family:Arial;
            }

            button{
                padding:18px 40px;
                font-size:22px;
                border:none;
                border-radius:12px;
                background:#0088cc;
                color:white;
                cursor:pointer;
                transition:0.2s;
            }

            button:hover{
                transform:scale(1.05);
                opacity:0.9;
            }

        </style>

    </head>

    <body>

        <button onclick="verify()">
            ✅ Verify
        </button>

        <script>

            async function verify(){

                const username = prompt("Enter Telegram Username")

                if(!username){
                    alert("Username required 💀")
                    return
                }

                try{

                    const response = await fetch("/verify",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            username
                        })
                    })

                    const data = await response.json()

                    if(data.success){
                        alert("Verified Successfully 🚀")
                    }else{
                        alert("Error 💀")
                    }

                }catch(err){

                    console.log(err)

                    alert("Server Error 💀")

                }

            }

        </script>

    </body>

    </html>

    `)

})

// ======================
// VERIFY ROUTE
// ======================

app.post("/verify", async (req, res) => {

    try{

        const { username } = req.body

        console.log("Username:", username)

        const telegramResponse = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: `🔥 @${username} verified from button`
            }
        )

        console.log("Telegram Success:")
        console.log(telegramResponse.data)

        res.json({
            success:true
        })

    }catch(err){

        console.log("========== ERROR ==========")

        if(err.response){
            console.log(JSON.stringify(err.response.data, null, 2))
        }else{
            console.log(err.message)
        }

        console.log("===========================")

        res.status(500).json({
            success:false
        })

    }

})

// ======================
// START SERVER
// ======================

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000")
})