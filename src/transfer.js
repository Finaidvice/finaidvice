const countries = [
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "BR", name: "Brazil", currency: "BRL" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "CN", name: "China", currency: "CNY" },
  { code: "FR", name: "France", currency: "EUR" },
  { code: "DE", name: "Germany", currency: "EUR" },
  { code: "GH", name: "Ghana", currency: "GHS" },
  { code: "IN", name: "India", currency: "INR" },
  { code: "ID", name: "Indonesia", currency: "IDR" },
  { code: "IE", name: "Ireland", currency: "EUR" },
  { code: "IT", name: "Italy", currency: "EUR" },
  { code: "JP", name: "Japan", currency: "JPY" },
  { code: "KE", name: "Kenya", currency: "KES" },
  { code: "MX", name: "Mexico", currency: "MXN" },
  { code: "NL", name: "Netherlands", currency: "EUR" },
  { code: "NZ", name: "New Zealand", currency: "NZD" },
  { code: "NG", name: "Nigeria", currency: "NGN" },
  { code: "PH", name: "Philippines", currency: "PHP" },
  { code: "SG", name: "Singapore", currency: "SGD" },
  { code: "ZA", name: "South Africa", currency: "ZAR" },
  { code: "ES", name: "Spain", currency: "EUR" },
  { code: "LK", name: "Sri Lanka", currency: "LKR" },
  { code: "CH", name: "Switzerland", currency: "CHF" },
  { code: "TH", name: "Thailand", currency: "THB" },
  { code: "AE", name: "United Arab Emirates", currency: "AED" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "VN", name: "Vietnam", currency: "VND" }
];

const fromSelect = document.getElementById("fromCountry");
const toSelect = document.getElementById("toCountry");
const tipText = document.getElementById("tipText");
const shareToggle = document.getElementById("shareToggle");
const shareMenu = document.getElementById("shareMenu");
const shareStatus = document.getElementById("shareStatus");

function fillSelect(select, selectedCode) {
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = `${country.name} (${country.currency})`;
    option.selected = country.code === selectedCode;
    select.append(option);
  });
}

function updateTip() {
  const from = countries.find((country) => country.code === fromSelect.value);
  const to = countries.find((country) => country.code === toSelect.value);
  if (!from || !to) return;

  let tip;
  if (from.code === to.code) {
    tip = `Both ends of this route are in ${from.name}. If you’re moving money between accounts, compare the account transfer terms and check for any maintenance or transaction charges.`;
  } else if (from.currency === to.currency) {
    tip = `${from.name} and ${to.name} both use ${from.currency}. Ask providers whether the transfer can stay in that currency from start to finish, and compare the total fee before confirming.`;
  } else {
    tip = `For a transfer from ${from.name} (${from.currency}) to ${to.name} (${to.currency}), compare the exchange rate and transfer fee together. Check the recipient amount, delivery time, and whether intermediary-bank charges may apply.`;
  }

  tipText.textContent = tip;
  shareStatus.textContent = "";
  updateShareLinks(from, to, tip);
}

function updateShareLinks(from, to, tip) {
  const pageUrl = window.location.href.split("#")[0];
  const message = `Finaidvice tip for ${from.name} to ${to.name}: ${tip} ${pageUrl}`;
  document.getElementById("whatsappShare").href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  document.getElementById("xShare").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Finaidvice tip for ${from.name} to ${to.name}: ${tip}`)}&url=${encodeURIComponent(pageUrl)}`;
  document.getElementById("emailShare").href = `mailto:?subject=${encodeURIComponent(`A money transfer tip: ${from.name} to ${to.name}`)}&body=${encodeURIComponent(message)}`;
}

fillSelect(fromSelect, "US");
fillSelect(toSelect, "GB");
updateTip();

fromSelect.addEventListener("change", updateTip);
toSelect.addEventListener("change", updateTip);
document.getElementById("swapCountries").addEventListener("click", () => {
  const currentFrom = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = currentFrom;
  updateTip();
});

shareToggle.addEventListener("click", () => {
  const isOpen = shareToggle.getAttribute("aria-expanded") === "true";
  shareToggle.setAttribute("aria-expanded", String(!isOpen));
  shareMenu.hidden = isOpen;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".share-area") && !shareMenu.hidden) {
    shareMenu.hidden = true;
    shareToggle.setAttribute("aria-expanded", "false");
  }
});

shareToggle.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !shareMenu.hidden) {
    shareMenu.hidden = true;
    shareToggle.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href.split("#")[0]);
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
      title: "Finaidvice transfer tip",
      text: tipText.textContent,
      url: window.location.href.split("#")[0]
    });
    shareStatus.textContent = "Thanks for sharing.";
  } catch (error) {
    if (error.name !== "AbortError") {
      shareStatus.textContent = "Sharing didn’t work. Try copying the page link instead.";
    }
  }
});
