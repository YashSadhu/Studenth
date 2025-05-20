// scripts/flashcard_review.js

// Constants for spaced repetition algorithm
const DIFFICULTY = {
    FORGOT: 1,
    HARD: 2,
    MEDIUM: 3,
    EASY: 4
};

// Minimum ease factor to prevent cards becoming too frequent
const MIN_EASE_FACTOR = 1.3;

// Database service for flashcard operations
class FlashcardService {
    constructor() {
        // In a real app, this would initialize IndexedDB connection
        this.db = null;
        this.isInitialized = false;
    }

    async init() {
        // Simulate database initialization
        return new Promise(resolve => {
            setTimeout(() => {
                this.isInitialized = true;
                this.db = {};
                resolve();
            }, 500);
        });
    }

    async getDeckById(deckId) {
        // Simulate fetching deck data from IndexedDB
        return new Promise(resolve => {
            // Mock data for demonstration
            const deckData = {
                id: deckId,
                title: this.getDeckTitleById(deckId),
                subject: this.getDeckSubjectById(deckId),
                cardsCount: this.getCardsCountById(deckId),
                dueCardsCount: this.getDueCardsCountById(deckId),
                lastReviewed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                mastery: Math.floor(Math.random() * 40) + 40 // Random between 40-80%
            };
            setTimeout(() => resolve(deckData), 300);
        });
    }

    getDeckTitleById(deckId) {
        // Return mock deck title based on ID
        const titles = {
            '1': 'Organic Chemistry: Functional Groups',
            '2': 'JavaScript: Promises & Async/Await',
            '3': 'Spanish Verb Conjugations',
            '4': 'World History: Renaissance Period',
            '5': 'Calculus: Integration Techniques'
        };
        return titles[deckId] || 'Unknown Deck';
    }

    getDeckSubjectById(deckId) {
        // Return mock subject based on ID
        const subjects = {
            '1': 'Chemistry',
            '2': 'Programming',
            '3': 'Languages',
            '4': 'History',
            '5': 'Mathematics'
        };
        return subjects[deckId] || 'General';
    }

    getCardsCountById(deckId) {
        // Return mock card count based on ID
        const counts = {
            '1': 42,
            '2': 18,
            '3': 31,
            '4': 24,
            '5': 15
        };
        return counts[deckId] || 0;
    }

    getDueCardsCountById(deckId) {
        // Return mock due cards count based on ID
        const dueCounts = {
            '1': 42,
            '2': 18,
            '3': 12,
            '4': 8,
            '5': 5
        };
        return dueCounts[deckId] || 0;
    }

    async getFlashcardsForDeck(deckId) {
        // Simulate fetching flashcards for a deck
        return new Promise(resolve => {
            // Mock data with a few sample flashcards
            let flashcards = [];
            
            if (deckId === '2') { // JavaScript deck
                flashcards = [
                    {
                        id: 1,
                        question: "What are JavaScript Promises and how do they differ from callbacks?",
                        answer: "<p class='mb-3'>Promises are objects that represent the eventual completion or failure of an asynchronous operation.</p><p class='mb-3'>Key differences from callbacks:</p><ul class='list-disc pl-5 mb-3'><li>Allow for chaining with <code>.then()</code> instead of nested callbacks</li><li>Better error handling with <code>.catch()</code></li><li>Avoid \"callback hell\" or \"pyramid of doom\"</li><li>Support for Promise.all() and Promise.race() for multiple async operations</li></ul>",
                        subject: "JavaScript",
                        difficulty: "medium",
                        lastReviewed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                        nextReview: new Date(Date.now()),
                        repetitionCount: 3,
                        easeFactor: 2.5
                    },
                    {
                        id: 2,
                        question: "Explain the async/await syntax in JavaScript and how it works with Promises.",
                        answer: "<p class='mb-3'>Async/await is syntactic sugar built on top of Promises, making asynchronous code look more like synchronous code.</p><p class='mb-3'>Key points:</p><ul class='list-disc pl-5 mb-3'><li>Functions marked with <code>async</code> always return a Promise</li><li>The <code>await</code> keyword can only be used inside an async function</li><li>When <code>await</code> is used with a Promise, it pauses execution until the Promise resolves</li><li>Errors can be caught using try/catch blocks</li><li>It's still using Promises under the hood</li></ul>",
                        subject: "JavaScript",
                        difficulty: "hard",
                        lastReviewed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                        nextReview: new Date(Date.now()),
                        repetitionCount: 2,
                        easeFactor: 2.2
                    },
                    {
                        id: 3,
                        question: "What is the difference between setTimeout and setInterval?",
                        answer: "<p class='mb-3'><strong>setTimeout:</strong> Executes a function once after a specified delay.</p><p class='mb-3'><strong>setInterval:</strong> Repeatedly executes a function with a fixed time delay between each call.</p><p>Key differences:</p><ul class='list-disc pl-5'><li>setTimeout runs once, setInterval runs repeatedly</li><li>setTimeout guarantees the delay between completion of the function and next execution</li><li>setInterval guarantees the delay between the start of each execution</li><li>Both return an ID that can be used to cancel with clearTimeout/clearInterval</li></ul>",
                        subject: "JavaScript",
                        difficulty: "easy",
                        lastReviewed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                        nextReview: new Date(Date.now()),
                        repetitionCount: 4,
                        easeFactor: 2.8
                    }
                ];
            } else if (deckId === '1') { // Chemistry deck
                flashcards = [
                    {
                        id: 1,
                        question: "What is a carbonyl group and which functional groups contain it?",
                        answer: "<p class='mb-3'>A carbonyl group consists of a carbon atom double-bonded to an oxygen atom (C=O).</p><p class='mb-3'>Functional groups containing a carbonyl:</p><ul class='list-disc pl-5'><li>Aldehydes</li><li>Ketones</li><li>Carboxylic acids</li><li>Esters</li><li>Amides</li></ul>",
                        subject: "Chemistry",
                        difficulty: "medium",
                        lastReviewed: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                        nextReview: new Date(Date.now()),
                        repetitionCount: 2,
                        easeFactor: 2.3
                    },
                    {
                        id: 2,
                        question: "What is the difference between an alcohol and an ether?",
                        answer: "<p class='mb-3'>Both alcohols and ethers contain oxygen atoms, but differ in their bonding:</p><p class='mb-3'><strong>Alcohols (R-OH):</strong> Have an -OH group bonded to a carbon atom. Example: ethanol (CH₃CH₂OH)</p><p class='mb-3'><strong>Ethers (R-O-R'):</strong> Have an oxygen atom bonded to two carbon groups. Example: diethyl ether (CH₃CH₂OCH₂CH₃)</p><p>Alcohols can form hydrogen bonds and are more reactive, while ethers are less reactive and more useful as solvents.</p>",
                        subject: "Chemistry",
                        difficulty: "medium",
                        lastReviewed: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                        nextReview: new Date(Date.now()),
                        repetitionCount: 1,
                        easeFactor: 2.1
                    }
                ];
            } else {
                // Generate some generic cards for other decks
                const subjects = {
                    '3': 'Spanish',
                    '4': 'History',
                    '5': 'Mathematics'
                };
                
                for (let i = 1; i <= 5; i++) {
                    flashcards.push({
                        id: i,
                        question: `Sample question ${i} for ${subjects[deckId]} deck`,
                        answer: `<p>Sample answer ${i} for the ${subjects[deckId]} deck.</p><p>This would contain the detailed information needed to understand the concept.</p>`,
                        subject: subjects[deckId] || 'General',
                        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
                        lastReviewed: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
                        nextReview: new Date(Date.now()),
                        repetitionCount: Math.floor(Math.random() * 5),
                        easeFactor: 1.3 + Math.random() * 1.7 // Between 1.3 and 3.0
                    });
                }
            }
            
            setTimeout(() => resolve(flashcards), 500);
        });
    }

    async updateFlashcard(flashcard) {
        // In a real app, this would update the flashcard in IndexedDB
        return new Promise(resolve => {
            // Simulate delay for saving
            setTimeout(() => resolve(flashcard), 200);
        });
    }

    async saveReviewSession(sessionData) {
        // In a real app, this would save the review session data to IndexedDB
        return new Promise(resolve => {
            console.log('Saving review session:', sessionData);
            setTimeout(() => resolve(true), 300);
        });
    }
}

// Spaced Repetition Algorithm (SM-2)
class SpacedRepetition {
    constructor() {
        // Default parameters for the SM-2 algorithm
        this.defaultEaseFactor = 2.5;
    }

    calculateNextReview(card, performanceRating) {
        // Clone the card object to avoid mutations
        const updatedCard = { ...card };

        // Get current values or set defaults
        let repetition = updatedCard.repetitionCount || 0;
        let easeFactor = updatedCard.easeFactor || this.defaultEaseFactor;

        // Calculate new values based on performance rating
        repetition++;
        
        // Update ease factor based on performance
        switch(performanceRating) {
            case DIFFICULTY.FORGOT: // 1 - complete blackout
                repetition = 0; // Reset repetition count
                easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.3);
                break;
            case DIFFICULTY.HARD: // 2 - incorrect response but remembered
                easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
                break;
            case DIFFICULTY.MEDIUM: // 3 - correct with difficulty
                easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.05);
                break;
            case DIFFICULTY.EASY: // 4 - perfect response
                easeFactor = easeFactor + 0.1;
                break;
        }

        // Calculate interval (days until next review)
        let interval;
        if (repetition <= 1) {
            interval = 1; // 1 day
        } else if (repetition === 2) {
            interval = 3; // 3 days
        } else {
            // Calculate interval using ease factor
            interval = Math.round((repetition - 1) * easeFactor);
        }

        // Adjust interval based on difficulty
        if (performanceRating === DIFFICULTY.FORGOT) {
            interval = 1; // Review again tomorrow if forgotten
        } else if (performanceRating === DIFFICULTY.HARD) {
            interval = Math.max(1, Math.floor(interval * 0.5)); // At least 1 day, but shorter interval
        }

        // Calculate next review date
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);

        // Update card with new values
        updatedCard.repetitionCount = repetition;
        updatedCard.easeFactor = easeFactor;
        updatedCard.lastReviewed = new Date();
        updatedCard.nextReview = nextReview;

        return updatedCard;
    }
}

// Review session manager
class ReviewSession {
    constructor(deckId) {
        this.deckId = deckId;
        this.flashcardService = new FlashcardService();
        this.spacedRepetition = new SpacedRepetition();
        this.cards = [];
        this.currentCardIndex = 0;
        this.startTime = null;
        this.results = {
            cardsReviewed: 0,
            ratings: {
                [DIFFICULTY.FORGOT]: 0,
                [DIFFICULTY.HARD]: 0,
                [DIFFICULTY.MEDIUM]: 0,
                [DIFFICULTY.EASY]: 0
            },
            timeSpent: 0
        };
    }

    async initialize() {
        try {
            await this.flashcardService.init();
            this.deck = await this.flashcardService.getDeckById(this.deckId);
            this.cards = await this.flashcardService.getFlashcardsForDeck(this.deckId);
            this.startTime = new Date();
            return true;
        } catch (error) {
            console.error('Error initializing review session:', error);
            return false;
        }
    }

    getCurrentCard() {
        return this.cards[this.currentCardIndex] || null;
    }

    getTotalCards() {
        return this.cards.length;
    }

    async rateCard(rating) {
        const currentCard = this.getCurrentCard();
        if (!currentCard) return false;

        // Update card using spaced repetition algorithm
        const updatedCard = this.spacedRepetition.calculateNextReview(currentCard, rating);
        
        // Save updated card
        await this.flashcardService.updateFlashcard(updatedCard);
        
        // Update this.cards array with updated card
        this.cards[this.currentCardIndex] = updatedCard;
        
        // Update session results
        this.results.cardsReviewed++;
        this.results.ratings[rating]++;
        
        return true;
    }

    moveToNextCard() {
        if (this.currentCardIndex < this.cards.length - 1) {
            this.currentCardIndex++;
            return true;
        }
        return false; // No more cards
    }

    moveToPreviousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            return true;
        }
        return false; // Already at first card
    }

    async completeSession() {
        // Calculate time spent
        const endTime = new Date();
        this.results.timeSpent = Math.floor((endTime - this.startTime) / 1000); // in seconds
        
        // Calculate success rate - anything medium or better is considered success
        const successes = this.results.ratings[DIFFICULTY.MEDIUM] + this.results.ratings[DIFFICULTY.EASY];
        this.results.successRate = Math.round((successes / this.results.cardsReviewed) * 100);
        
        // Add deck info to results
        this.results.deckId = this.deckId;
        this.results.deckTitle = this.deck.title;
        this.results.completedAt = endTime;
        
        // Save session results
        return await this.flashcardService.saveReviewSession(this.results);
    }

    getSessionResults() {
        // Calculate percentages for each rating
        const totalRatings = this.results.cardsReviewed;
        const ratingPercentages = {
            [DIFFICULTY.FORGOT]: Math.round((this.results.ratings[DIFFICULTY.FORGOT] / totalRatings) * 100) || 0,
            [DIFFICULTY.HARD]: Math.round((this.results.ratings[DIFFICULTY.HARD] / totalRatings) * 100) || 0,
            [DIFFICULTY.MEDIUM]: Math.round((this.results.ratings[DIFFICULTY.MEDIUM] / totalRatings) * 100) || 0,
            [DIFFICULTY.EASY]: Math.round((this.results.ratings[DIFFICULTY.EASY] / totalRatings) * 100) || 0
        };
        
        // Format time spent
        const minutes = Math.floor(this.results.timeSpent / 60);
        const seconds = this.results.timeSpent % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        // Return formatted results
        return {
            cardsReviewed: this.results.cardsReviewed,
            timeSpent: formattedTime,
            successRate: `${this.results.successRate}%`,
            nextReviewDate: this.getNextReviewDate(),
            ratingPercentages
        };
    }

    getNextReviewDate() {
        // Find the earliest next review date from all cards
        let earliestDate = null;
        
        for (const card of this.cards) {
            if (!earliestDate || card.nextReview < earliestDate) {
                earliestDate = new Date(card.nextReview);
            }
        }
        
        if (!earliestDate) return 'Unknown';
        
        // Format relative date
        const now = new Date();
        const diffDays = Math.round((earliestDate - now) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 7) return `In ${diffDays} days`;
        if (diffDays < 30) return `In ${Math.round(diffDays/7)} weeks`;
        
        return earliestDate.toLocaleDateString();
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // This would be used in a real implementation, with the HTML referencing this file
    // The implementation has been moved into the inline script for this demo
    console.log('Flashcard review script loaded');
});

// Export classes for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FlashcardService,
        SpacedRepetition,
        ReviewSession,
        DIFFICULTY
    };
}