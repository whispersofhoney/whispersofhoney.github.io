// Reveal sections on scroll with typing effect
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("visible")) {
            entry.target.classList.add("visible");

            // Find the <p> inside this section
            const p = entry.target.querySelector(".text p");
            if (p) {
                const text = p.textContent;
                p.textContent = ""; // clear original text
                typeText(p, text, 40); // 40ms per character
            }
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Bee random flight
function randomFlight(bee) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = 3000 + Math.random() * 4000; // 3–7s

    bee.animate(
        [
            { transform: `translate(${bee.x || 0}px, ${bee.y || 0}px)` },
            { transform: `translate(${x}px, ${y}px)` }
        ],
        {
            duration,
            easing: "ease-in-out",
            fill: "forwards"
        }
    );

    bee.x = x;
    bee.y = y;

    setTimeout(() => randomFlight(bee), duration - 500);
}

document.querySelectorAll(".bee").forEach((bee, i) => {
    bee.x = Math.random() * window.innerWidth;
    bee.y = Math.random() * window.innerHeight;
    bee.style.transform = `translate(${bee.x}px, ${bee.y}px)`;
    setTimeout(() => randomFlight(bee), i * 1000);
});

// Counter logic
const clock = document.getElementById("clock");
const wish = document.getElementById("wish");
let minute = 0;
let timer;

function updateClock() {
    let time = `11:${minute.toString().padStart(2, '0')}`;

    clock.classList.remove("flip");
    void clock.offsetWidth; // reflow
    clock.classList.add("flip");

    clock.textContent = time;

    if (minute === 11) {
        // Special 11:11 effect
        setTimeout(() => {
            clock.classList.add("final-eleven-eleven");
        }, 600);

        clearInterval(timer);

        // After 3 seconds, fade out clock & fade in wish
        setTimeout(() => {
            clock.classList.add("fade-out");
            setTimeout(() => {
                clock.style.display = "none";
                wish.style.display = "block";
                setTimeout(() => {
                    wish.classList.add("final", "fade-in");
                }, 50);
            }, 1500); // wait fade-out
        }, 3000);
    }

    minute++;
}

// Start countdown only when visible
function startClockWhenVisible() {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            // Show intro messages before counter
            runIntroMessages(() => {
                // after messages -> start clock
                timer = setInterval(updateClock, 220); // 1 min = 2s demo
            });
            observer.disconnect();
        }
    });
    observer.observe(clock);
}
startClockWhenVisible();

// Intro message sequence
function runIntroMessages(callback) {
    const messages = [
        "Madhu... do you even know how much you mean to me?",
        "I remember everything you've shared about you..",
        "You know this song, right?",
        "Yes. Its from 'Friends' :)",
        "Just so you know, I was planning this for a month.. Just for you",
        "You're Special, Madhu..",
        "You've always been!!",
        "Yes, we don't talk as much as we did before",
        "But that doesn't mean I don't love you like I did...",
        "Yes. I do. And you hold a special place in my heart",
        "When you told me that things are not okay between us...",
        "That broke me a little. (Maybe thodu sa zyda :P)",
        "That was the day I decided to come to Bangalore...",
        "Just for You, Madhu",
        "Because...",
        "I can't hurt my loved ones... :)",
        "And trust me...",
        "I have got very veryyy few people like you...",
        "Maybe.. I got just you, Madhu... apart from Family..",
        "And honestly... I don’t need a hundred people. Just one Madhu is enough.",
        "So tell me this...",
        "Ready for the next surprise?",
        "Okay. Hold on...",
        "You might wanna take a deep breath for this..."
    ];

    const container = document.getElementById("messages");
    let index = 0;

    function showNext() {
        if (index < messages.length) {
            container.innerHTML = `<div class="fade-message">${messages[index]}</div>`;
            index++;
            setTimeout(showNext, 6000); // show each 3s
        } else {
            // clear and reveal counter
            container.innerHTML = "";
            clock.style.display = "block";
            if (callback) callback();
        }
    }

    // hide clock initially
    clock.style.display = "none";
    showNext();
}

// Heart click audio
document.addEventListener("DOMContentLoaded", () => {
    const heart = document.getElementById("heart");
    const audio = new Audio("audio/friends-theme.mp3");
    audio.loop = true;
    heart.addEventListener("click", () => {
        heart.classList.add("beating");
        audio.play().catch(err => {
            console.log("Audio play blocked:", err);
        });
    });
});

// Generate random stars
function createStars(count) {
    const container = document.getElementById('counter-container');
    for (let i = 0; i < count; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        let size = Math.random() * 3 + 1 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        container.appendChild(star);
    }
}

// Generate random shooting stars
function createShootingStars(count) {
    const container = document.getElementById('counter-container');
    for (let i = 0; i < count; i++) {
        let star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = Math.random() * 50 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(star);
    }
}

createStars(100);
createShootingStars(5);


// Typing effect function
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = "";
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

