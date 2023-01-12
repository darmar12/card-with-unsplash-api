const CLIENT_ID = "tN7ANv_LEUdKaKIYcFc0FMEY_spS_bFwFvnpo1j8u08";
const slider = document.getElementById("slider");

let state = [];
let activeSlide;

const fetchPhotos = async () => {
    try {
        const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4`;
        const res = await fetch(url);
        const data = await res.json();
    
        if(res.ok && data.length > 0) {
            state = data;
            activeSlide = data[0].id;
            setItems();
        }
    } catch (err) {
        throw new Error(err);
    }
};

const renderItem = () => {
    return state
            .map(({urls: {regular}, user: {name}, id}) => {
                const isActive = activeSlide === id ? "active" : "";
                return `
                    <figure class="slider__item ${isActive}">
                        <img src="${regular}" alt="photo create by ${name}" class="slider__image">
                        <figcaption>
                            <p class="slider__text">
                                Create by
                                <span class="slider__author">${name}</span>
                            </p>   
                        </figcaption>
                    </figure>
                `
            })
            .join("");
};

const changeSlide = ({ currentTarget }) => {
    console.log(currentTarget);
    const sliderItems = slider.querySelectorAll(".slider__item");
    sliderItems.forEach(item => item.classList.remove("active"));
    currentTarget.classList.add("active");
};

const setItems = () => {
    slider.innerHTML = renderItem();
    const sliderItems = slider.querySelectorAll(".slider__item");
    console.log(sliderItems);
    sliderItems.forEach(item => {
        item.addEventListener('click', changeSlide);    
    });
};

fetchPhotos();