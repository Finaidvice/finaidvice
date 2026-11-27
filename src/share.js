const shareToggle = document.getElementById("shareToggle");
const shareOptions = document.getElementById("shareActions");
const shareStatus = document.getElementById("shareStatus");
const pageUrl = window.location.href.split("#")[0];
const message = `Explore Finaidvice for international money transfer tips: ${pageUrl}`;

document.getElementById("whatsappShare").href = `https://wa.me/?text=${encodeURIComponent(message)}`;
document.getElementById("xShare").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
document.getElementById("emailShare").href = `mailto:?subject=${encodeURIComponent("Finaidvice — international money transfer guide")}&body=${encodeURIComponent(message)}`;
document.getElementById("year").textContent = new Date().getFullYear();

shareToggle.addEventListener("click", () => {
  const isOpen = shareToggle.getAttribute("aria-expanded") === "true";
  shareToggle.setAttribute("aria-expanded", String(!isOpen));
  shareOptions.hidden = isOpen;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".share-area") && !shareOptions.hidden) {
    shareOptions.hidden = true;
    shareToggle.setAttribute("aria-expanded", "false");
  }
});

shareToggle.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !shareOptions.hidden) {
    shareOptions.hidden = true;
    shareToggle.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(pageUrl);
    shareStatus.textContent = "Page link copied to clipboard.";
  } catch (error) {
    shareStatus.textContent = "Could not copy the link. You can copy the page address from your browser bar.";
  }
});

document.getElementById("nativeShare").addEventListener("click", async () => {
  if (!navigator.share) {
    shareStatus.textContent = "Direct sharing is not supported here. Choose a social app or copy the link instead.";
    return;
  }

  try {
    await navigator.share({
      title: "Finaidvice — international money transfer guide",
      text: "Explore Finaidvice for international money transfer tips.",
      url: pageUrl
    });
    shareStatus.textContent = "Thanks for sharing.";
  } catch (error) {
    if (error.name !== "AbortError") {
      shareStatus.textContent = "Sharing didn’t work. Try copying the page link instead.";
    }
  }
});
