
// ANIMAL SEARCH
const searchInput = document.querySelector("#animal-search");
const animalCards = document.querySelectorAll(".animal-card");
const resultCount = document.querySelector("#result-count");
const noResults = document.querySelector("#no-results");

if (searchInput && resultCount && noResults) {
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        animalCards.forEach(function (card) {
            const animalInfo = card.textContent.toLowerCase();
            const matches = animalInfo.includes(searchText);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        resultCount.textContent =
            `Showing ${visibleCount} of ${animalCards.length} animals.`;

        noResults.hidden = visibleCount !== 0;
    });
}

// ADOPTION ENQUIRY FORM
const enquiryForm = document.querySelector("#enquiry-form");

if (enquiryForm) {
    const formStatus = document.querySelector("#form-status");

    const fields = [
        { input: document.querySelector("#name"), error: document.querySelector("#name-error"), label: "Please enter your name." },
        { input: document.querySelector("#email"), error: document.querySelector("#email-error"), label: "Please enter a valid email address." },
        { input: document.querySelector("#animal"), error: document.querySelector("#animal-error"), label: "Please tell us which animal interests you." },
        { input: document.querySelector("#message"), error: document.querySelector("#message-error"), label: "Please tell us a little about yourself." }
    ];

    fields.forEach(function (field) {
        field.input.addEventListener("input", function () {
            field.error.textContent = "";
            field.input.removeAttribute("aria-invalid");
        });
    });

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        let firstInvalidField = null;

        fields.forEach(function (field) {
            let message = "";

            if (field.input.value.trim() === "") {
                message = field.label;
            } else if (
                field.input.type === "email" &&
                !field.input.validity.valid
            ) {
                message = field.label;
            }

            field.error.textContent = message;

            if (message) {
                field.input.setAttribute("aria-invalid", "true");
                isValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = field.input;
                }
            } else {
                field.input.removeAttribute("aria-invalid");
            }
        });

        if (!isValid) {
            formStatus.textContent = "Please correct the errors in the form.";
            firstInvalidField.focus();
            return;
        }

        const enquiry = {
            name: document.querySelector("#name").value.trim(),
            email: document.querySelector("#email").value.trim(),
            animal: document.querySelector("#animal").value.trim(),
            message: document.querySelector("#message").value.trim()
        };

        try {
            const savedEnquiries = JSON.parse(
                localStorage.getItem("tassulaEnquiries") || "[]"
            );

            savedEnquiries.push(enquiry);

            localStorage.setItem(
                "tassulaEnquiries",
                JSON.stringify(savedEnquiries)
            );

            formStatus.textContent =
                "Your enquiry has been saved in this browser. Thank you!";

            enquiryForm.reset();
        } catch (error) {
            formStatus.textContent =
                "Sorry, your enquiry could not be saved in this browser.";
        }
    });
}
// ADOPTION HELP POPOVER
const helpButton = document.querySelector("#help-button");
const adoptionHelp = document.querySelector("#adoption-help");

if (helpButton && adoptionHelp) {
    helpButton.addEventListener("click", function () {
        const isOpen = helpButton.getAttribute("aria-expanded") === "true";

        helpButton.setAttribute("aria-expanded", String(!isOpen));
        adoptionHelp.hidden = isOpen;
    });
}
