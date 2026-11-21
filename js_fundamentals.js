
/*
===========================================
WEEK 2 - DAY 3: JAVASCRIPT FUNDAMENTALS
===========================================
*/

// API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";


// 1. Arrow Function
const greet = (name) => {
    return `Hello, ${name}! Welcome to JavaScript.`;
};

console.log("1. Greeting:", greet("Developer"));


// 2. Default Parameters
const addNumbers = (a = 0, b = 0) => {
    return a + b;
};

console.log("2. Addition:", addNumbers(10, 20));


// 3. Rest Operator
const calculateAverage = (...numbers) => {
    if (numbers.length === 0) return 0;

    const total = numbers.reduce((sum, num) => sum + num, 0);
    return total / numbers.length;
};

console.log("3. Average:", calculateAverage(10, 20, 30, 40));


// 4. Array - Get First Element
const getFirstElement = (items = []) => {
    return items[0] ?? "Array is empty";
};

console.log("4. First Element:", getFirstElement(["HTML", "CSS", "JavaScript"]));


// 5. Array Map - Double Numbers
const doubleNumbers = (numbers) => {
    return numbers.map(num => num * 2);
};

console.log("5. Doubled Numbers:", doubleNumbers([1, 2, 3, 4]));


// 6. Array Filter - Find Even Numbers
const getEvenNumbers = (numbers) => {
    return numbers.filter(num => num % 2 === 0);
};

console.log("6. Even Numbers:", getEvenNumbers([1, 2, 3, 4, 5, 6]));


// 7. Object Destructuring
const getUserSummary = ({ name = "Unknown", role = "Intern" } = {}) => {
    return `${name} is working as a ${role}.`;
};

const user = {
    name: "Alex",
    role: "Full Stack Developer"
};

console.log("7. User Details:", getUserSummary(user));


// 8. Spread Operator - Update Object
const updateUser = (user, updates) => {
    return { ...user, ...updates };
};

const updatedUser = updateUser(user, {
    role: "Software Developer Intern"
});

console.log("8. Updated User:", updatedUser);


// 9. Promise with .then() and .catch()
const fetchPostsWithThen = () => {
    console.log("\n9. Fetching posts using Promise...");

    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            return response.json();
        })
        .then(posts => {
            console.log("Posts received using .then():", posts);
            return posts;
        })
        .catch(error => {
            console.error("Promise Error:", error.message);
            return [];
        });
};


// 10. Async/Await with Try/Catch
const fetchPostsAsync = async () => {
    console.log("\n10. Fetching posts using async/await...");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();

        console.log("Posts received using async/await:", posts);
        return posts;

    } catch (error) {
        console.error("Async Error:", error.message);
        return [];
    }
};


// Execute API Functions
fetchPostsWithThen();
fetchPostsAsync();

console.log("\nAll JavaScript fundamentals examples executed!");
