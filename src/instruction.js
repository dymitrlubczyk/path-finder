const createInstruction = () => {
  const steps = [
    {
      title: "Step 1",
      imgUrl: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Step 2",
      imgUrl: "",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ]
  steps.reverse().forEach(stepContent => {
    document.body.appendChild(step(stepContent))
  })
}

const step = (stepContent) => {

  const { title, imgUrl, description } = stepContent

  const modal = document.createElement("div");
  modal.classList.add("modal");
  const heading = document.createElement("h2");
  heading.textContent = title;
  const image = document.createElement("img")
  image.src = imgUrl;
  const content = document.createElement("p");
  content.textContent = description;
  const next = document.createElement("button");
  next.textContent = "Next";

  next.addEventListener("click", () => {
    console.log("Hide")
    modal.classList.add("hide")
  })

  modal.appendChild(heading);
  modal.appendChild(image);
  modal.appendChild(content);
  modal.appendChild(next)

  return modal
}

export default createInstruction