var form = document.querySelector("#userForm");
const allUsersData = [];

// Function to reset the form
const resetForm = function () {
  form.classList.remove("was-validated");
  // Reset input values
  const name = document.getElementById("name");
  name.value = "";

  const email = document.getElementById("email");
  email.value = "";

  const website = document.getElementById("website");
  website.value = "";

  const image = document.getElementById("image");
  image.value = "";

  // Reset gender radio buttons
  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    rb.checked = false;
  }

  // Reset skill checkboxes
  const skillEl = document.querySelectorAll('input[name="skill"]');
  for (const rb of skillEl) {
    rb.checked = false;
  }
};

// Function to get the data from the form
const getData = function () {
  // Get input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const website = document.getElementById("website").value;
  const image = document.getElementById("image").value;
  let gender;
  let skills = [];

  // Get selected gender
  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    if (rb.checked) {
      gender = rb.value;
      break;
    }
  }

  // Get selected skills
  const skillEl = document.querySelectorAll('input[name="skill"]');
  for (const rb of skillEl) {
    if (rb.checked) {
      skills.push(rb.value);
    }
  }
  return { name, email, website, image, gender, skills };
};

// Event listener for the form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (form.checkValidity()) {
    // Get form data and add it to allUsersData array
    const data = getData();
    allUsersData.push(data);
    // Print the result
    printResult(data);
    // Reset the form
    resetForm();
  } else {
    form.classList.add("was-validated");
  }
  removeSpan();
});

// Function to remove the span tag ("fill the form to enroll the students")
function removeSpan() {
  var span = document.getElementById("span");
  if (span) {
    span.remove();
  }
}

// Function to print the form data in the right side of div by generating HTML elements inside the div
function printResult(data) {
  const resultEl = document.getElementById("enrolled-students");
  let sectionHeading = null;
  if (allUsersData.length == 1) {
    // Create section heading for the first user
    sectionHeading = document.createElement("div");
    const description = document.createElement("p");
    description.innerHTML = "Description";
    description.className = "description";

    const image = document.createElement("p");
    image.innerHTML = "Image";
    image.className = "Image";

    sectionHeading.className = "sectionHeading";
    sectionHeading.append(description, image);
  }

  // Create wrapper div for user data
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  wrapper.addEventListener("click", function (e) {
    if (e.target.className.includes("userDeleteBtn")) {
      // Remove the user data when delete button is clicked
      e.currentTarget.remove();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "+";
  deleteBtn.className = "userDeleteBtn";

  const textInfoContainer = document.createElement("div");
  textInfoContainer.className = "textInfoContainer";

  const imageContainer = document.createElement("div");
  imageContainer.className = "imageContainer";

  const imageHyperlink = document.createElement("a");
  imageHyperlink.href = data.image;
  imageHyperlink.target = "_blank";

  // Create and populate the user info elements
  let name = document.createElement("p");
  name.className = "infoText userName";
  name.innerHTML = data.name;

  let gender = document.createElement("p");
  gender.className = "infoText gender";
  gender.innerHTML = data.gender;

  let email = document.createElement("p");
  email.className = "infoText email";
  email.innerHTML = data.email;

  let website = document.createElement("a");
  website.className = "infoText website";
  website.innerHTML = data.website;
  website.href = data.website;
  website.target = "_blank";

  let skills = document.createElement("p");
  skills.className = "infoText skills";
  skills.innerHTML = data.skills.join(", ");

  let userImage = document.createElement("img");
  userImage.className = "userImage";
  userImage.src = data.image;

  // Append the user info elements to their respective containers
  textInfoContainer.append(name, gender, email, website, skills);
  imageHyperlink.appendChild(userImage);
  imageContainer.appendChild(imageHyperlink);

  // Append the containers to the wrapper div
  wrapper.append(textInfoContainer, imageContainer, deleteBtn);

  // Append the section heading and wrapper to the result element
  if (sectionHeading == null) {
    resultEl.append(wrapper);
  } else {
    resultEl.append(sectionHeading, wrapper);
  }
}
