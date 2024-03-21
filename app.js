const express = require("express")
const ytdl = require("ytdl-core")

const app = express()

// Ruta principal
app.get("/", (req, res) => {
   res.send("¡Hola! Esta es la página principal de la aplicación.")
})

// Ruta para descargar videos
app.get("/download/:videoId/:format?", async (req, res) => {
   const videoId = req.params.videoId
   const format = req.params.format || "highest"
   const url = `https://www.youtube.com/watch?v=${videoId}`

   try {
      let info
      if (format === "audio") {
         info = await ytdl.getInfo(url)
         const audioFormats = ytdl.filterFormats(info.formats, "audioonly")
         if (audioFormats.length > 0) {
            res.redirect(audioFormats[0].url)
         } else {
            throw new Error(
               "No se pudo obtener la información del audio del video"
            )
         }
      } else {
         const videoInfo = await ytdl.getInfo(url)
         const formats = ytdl.chooseFormat(videoInfo.formats, {
            quality: format,
         })
         if (formats) {
            res.redirect(formats.url)
         } else {
            throw new Error(
               "No se pudo encontrar un formato con la calidad seleccionada"
            )
         }
      }
   } catch (error) {
      console.error("Error al obtener la URL del video:", error)
      res.status(500).send("Error interno del servidor: " + error.message)
   }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${PORT}`)
})
