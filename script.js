function getVideoInfo() {
   var videoUrl = document.getElementById("video-url").value
   var videoId = extractVideoId(videoUrl)
   var format = document.getElementById("format").value
   if (videoId !== "") {
      downloadVideo(videoId, format)
   } else {
      alert("Por favor, ingrese una URL válida de YouTube")
   }
}

function extractVideoId(url) {
   var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
   var match = url.match(regExp)
   if (match && match[2].length == 11) {
      return match[2]
   } else {
      return ""
   }
}

function downloadVideo(videoId, format) {
   window.location.href = `http://localhost:3000/download/${videoId}/${format}`
}
