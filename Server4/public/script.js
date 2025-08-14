const API_KEY = 'AIzaSyAHpQPbL1bZ3IhBeivMoc24XsQvIVMDABg';
const searchInput = document.getElementById("search");
const thumbnailsContainer = document.getElementById("thumbnails");
const videoPlayer = document.getElementById("videoPlayer");

async function searchYouTube(query) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=6&key=${API_KEY}`
  );
  const data = await res.json();
  renderThumbnails(data.items);
}

function renderThumbnails(videos) {
  thumbnailsContainer.innerHTML = "";
  videos.forEach(video => {
    const vidId = video.id.videoId;
    const thumb = video.snippet.thumbnails.medium.url;
    const img = document.createElement("img");
    img.src = thumb;
    img.className = "thumbnail";
    img.onclick = () => {
      videoPlayer.src = `https://www.youtube.com/embed/${vidId}`;
    };
    thumbnailsContainer.appendChild(img);
  });
}

searchInput.addEventListener("input", e => {
  if (e.target.value.length > 2) searchYouTube(e.target.value);
});
