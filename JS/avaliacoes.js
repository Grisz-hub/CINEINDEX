const reviewsStorageKey = "cineindex-reviews";
const reviewForm = document.querySelector("#review-form");
const savedReviews = document.querySelector("#saved-reviews");
const emptyReviewsMessage = document.querySelector("#reviews-empty");
const reviewStatus = document.querySelector("#review-status");

function showReviewStatus(message, isError = false) {
    if (!reviewStatus) {
        return;
    }

    reviewStatus.textContent = message;
    reviewStatus.dataset.state = isError ? "error" : "success";
}

function readReviews() {
    const savedValue = localStorage.getItem(reviewsStorageKey);
    if (!savedValue) {
        return [];
    }

    const reviews = JSON.parse(savedValue);
    if (!Array.isArray(reviews)) {
        throw new Error("O histórico salvo não está em um formato válido.");
    }

    return reviews;
}

function renderReviews() {
    if (!savedReviews || !emptyReviewsMessage) {
        return;
    }

    try {
        const reviews = readReviews();
        savedReviews.replaceChildren();

        reviews.forEach((review) => {
            const card = document.createElement("article");
            card.className = "review-card";

            const title = document.createElement("h2");
            title.textContent = review.movie;

            const rating = document.createElement("p");
            rating.className = "review-card-rating";
            rating.textContent = `Nota: ${review.rating}/5`;

            const comment = document.createElement("p");
            comment.textContent = review.comment || "Sem comentário.";

            card.append(title, rating, comment);
            savedReviews.append(card);
        });

        emptyReviewsMessage.hidden = reviews.length > 0;
    } catch (error) {
        showReviewStatus("Não foi possível carregar as avaliações salvas. Verifique os dados deste navegador.", true);
        console.error("Erro ao carregar avaliações:", error);
    }
}

if (reviewForm instanceof HTMLFormElement) {
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(reviewForm);
        const review = {
            movie: String(formData.get("movie") || ""),
            rating: Number(formData.get("rating")),
            comment: String(formData.get("comment") || "").trim(),
            createdAt: new Date().toISOString()
        };

        try {
            const reviews = readReviews();
            reviews.push(review);
            localStorage.setItem(reviewsStorageKey, JSON.stringify(reviews));
            reviewForm.reset();
            showReviewStatus("Avaliação salva! Você pode conferi-la em Minhas avaliações.");
        } catch (error) {
            showReviewStatus("Não foi possível salvar. Verifique o armazenamento do navegador e tente novamente.", true);
            console.error("Erro ao salvar avaliação:", error);
        }
    });
}

renderReviews();
