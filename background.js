chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      function: pauseOrResumeVideo,
    });
  } catch (error) {
    console.error("Script execution failed: ", error);
  }
});

function pauseOrResumeVideo() {
  const video = document.querySelector('video');
  
  document.addEventListener('visibilitychange', function() {
    if (document.hidden && video) {
      video.pause();
    } else if (!document.hidden && video) {
      video.play();
    }
  });
  
  return video ? 'Video found and event listener added.' : 'No video found.';
}