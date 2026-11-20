import { Component, RenderContext, callback } from "@liquefy/cascade.component";
import { DOMElementTarget, animationContainer, button, text } from "@liquefy/cascade.dom";

const options = [
  { id: "transfer", title: "Transfer money internationally with lower fees" },
  { id: "travel", title: "Plan a travel budget" },
  { id: "savings", title: "Build an emergency fund" }
];

class FunctionMenu extends Component {
  initialState() {
    return { open: false };
  }

  toggle() {
    this.open = !this.open;
    document.getElementById("functionToggle").setAttribute("aria-expanded", String(this.open));
  }

  select(option) {
    this.open = false;
    document.getElementById("functionToggle").setAttribute("aria-expanded", "false");
    if (option.id === "transfer") {
      document.getElementById("menuStatus").textContent = "";
      document.getElementById("toolCard").hidden = false;
      document.getElementById("toolTitle").focus({ preventScroll: true });
      document.getElementById("toolCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      document.getElementById("menuStatus").textContent = `${option.title} is coming soon.`;
    }
  }

  build() {
    const items = this.open
      ? options.map((option) => button(
          {
            key: option.id,
            class: "function-option",
            type: "button",
            onclick: callback(`choose-${option.id}`, () => this.select(option))
          },
          text(option.title)
        ))
      : [];

    return animationContainer(
      { class: "function-menu", style: { display: "grid", gap: "6px", overflow: "visible" } },
      items
    );
  }
}

const menu = new FunctionMenu();
const target = DOMElementTarget.forElement(document.getElementById("functionMenu"));
menu.establish().renderOnto(target, new RenderContext());
document.getElementById("functionToggle").addEventListener("click", () => menu.toggle());
