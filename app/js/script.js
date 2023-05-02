const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");
const INSTAGRAM_API = `https://graph.facebook.com/v16.0/sunilkc_123?fields=followers_count&access_token={access-token}`;
const YOUTUBE_API_KEY = `AIzaSyCTZTMfElUssuwSQ8v9cCIQY_gIIGtBBLA`;
const YOUTUBE_CHANNEL_ID = `UC_LhXd5tCK2mh2oh0HkPbVg`;
const YOUTUBE_VIDEO_LINK = `uTM_n885fgo`;

const setColorMode = () => {
  console.log("setColorMode");
  console.log(localStorage.getItem("colorMode"));

  if (localStorage.getItem("colorMode") === "dark") {
    setDarkMode();
    darkButton.click();
  } else if (localStorage.getItem("colorMode") === "light") {
    setLightMode();
    lightButton.click();
    
  }
};

const checkMode = () => {
  if (localStorage.getItem("colorMode") == null) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      lightButton.click();
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      darkButton.click();
    }
  }
};

const checkModeChange = () => {
  window
    .matchMedia("(prefers-color-scheme:dark)")
    .addEventListener("change", (event) => {
      console.log("checkModeChange");
      checkMode();
    });
};

const setDarkMode = () => {
  console.log("setDarkMode");
  document.querySelector("body").classList = "dark";
};
const setLightMode = () => {
  console.log("setLightMode");
  document.querySelector("body").classList = "light";
};

setColorMode();
checkMode();
checkModeChange();

const radioButtons = document.querySelectorAll(".toggle__wrapper input");
for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener("click", (event) => {
    console.log("radio button clicked");
    if (darkButton.checked) {
      localStorage.setItem("colorMode", "dark");
      setDarkMode();
    } else {
      localStorage.setItem("colorMode", "light");
      setLightMode();
    }
  });
}

async function fetchMyDocument() {
  const youtube_subs_count = document.getElementById("youtube-subs-count");
  const youtube_views_count = document.getElementById("youtube-total-views");
  const youtube_likes_count = document.getElementById("youtube-like-count");
  

  try {
    let response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    // let videoCount = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${YOUTUBE_VIDEO_LINK}&key=${YOUTUBE_API_KEY}&part=statistics`)
    
    const data = await response.json();
    // const video_LikeCount= await videoCount.json();

    const subCount = data.items[0].statistics.subscriberCount;
    const viewsCount = data.items[0].statistics.viewCount;
    // const videoLikeCount = video_LikeCount.items[0].statistics.likeCount;

    youtube_subs_count.innerHTML = subCount;
    youtube_views_count.innerHTML = viewsCount;
    // youtube_likes_count.innerHTML= videoLikeCount
  } catch (err) {
    console.log("Fetch error:" + err); // Error handling
  }
}
fetchMyDocument();


// async function getVideoIds() {
//     const url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=50&type=video&key=${YOUTUBE_API_KEY}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.items.map(item => item.id.videoId);
//   }

//   // Retrieve video statistics for a single video
//   async function getVideoStats(videoId) {
//     const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga:${videoId}&start-date=30daysAgo&end-date=today&metrics=ga:totalEvents&dimensions=ga:eventAction&filters=ga:eventCategory==Engagement;ga:eventAction==like;ga:eventLabel==${videoId}&access_token=${accessToken}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }

//   // Get total likes count for all videos in channel
//   async function getTotalLikes() {
//     const videoIds = await getVideoIds();
//     let totalLikes = 0;

//     for (const videoId of videoIds) {
//       const videoStats = await getVideoStats(videoId);
//       totalLikes += parseInt(videoStats.totalsForAllResults['ga:totalEvents']);
//     }


//     console.log(totalLikes)

//     const totalLikesElem = document.getElementById('total-likes');
//     totalLikesElem.textContent = `Total Likes: ${totalLikes}`;
//   }

//   getTotalLikes()
