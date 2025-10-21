// Outfit Evaluator JavaScript
class OutfitEvaluator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.photoInput = document.getElementById('photoInput');
        this.previewSection = document.getElementById('previewSection');
        this.previewImage = document.getElementById('previewImage');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.resultsSection = document.getElementById('resultsSection');
        this.scoreValue = document.getElementById('scoreValue');
        this.feedbackText = document.getElementById('feedbackText');
        this.suggestionsList = document.getElementById('suggestionsList');
        this.newPhotoBtn = document.getElementById('newPhotoBtn');
        this.primaryColor = document.getElementById('primaryColor');
        this.secondaryColor = document.getElementById('secondaryColor');
        this.accentColor = document.getElementById('accentColor');
        this.colorDescription = document.getElementById('colorDescription');
    }

    setupEventListeners() {
        // Upload area click
        this.uploadArea.addEventListener('click', () => {
            this.photoInput.click();
        });

        // File input change
        this.photoInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleFileSelect(file);
            }
        });

        // Analyze button
        this.analyzeBtn.addEventListener('click', () => {
            this.analyzeOutfit();
        });

        // New photo button
        this.newPhotoBtn.addEventListener('click', () => {
            this.resetToUpload();
        });
    }

    handleFileSelect(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewImage.src = e.target.result;
                this.previewSection.style.display = 'block';
                this.resultsSection.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    }

    analyzeOutfit() {
        // Show loading state
        this.analyzeBtn.textContent = 'Analyzing...';
        this.analyzeBtn.disabled = true;

        // Simulate analysis delay
        setTimeout(() => {
            const analysis = this.performOutfitAnalysis();
            this.displayResults(analysis);
            this.analyzeBtn.textContent = 'Analyze My Outfit';
            this.analyzeBtn.disabled = false;
        }, 2000);
    }

    performOutfitAnalysis() {
        // Simulate AI analysis with predefined rules
        // In a real implementation, this would use computer vision/AI
        const colorAnalysis = this.analyzeColors();
        const scores = {
            colorHarmony: Math.floor(Math.random() * 3) + 6, // 6-8
            styleConsistency: Math.floor(Math.random() * 3) + 5, // 5-7
            occasionAppropriate: Math.floor(Math.random() * 4) + 4, // 4-7
            fitAndProportion: Math.floor(Math.random() * 3) + 6, // 6-8
            accessories: Math.floor(Math.random() * 4) + 3 // 3-6
        };

        const totalScore = Math.round(
            (scores.colorHarmony + scores.styleConsistency + 
             scores.occasionAppropriate + scores.fitAndProportion + scores.accessories) / 5
        );

        return {
            score: totalScore,
            colorAnalysis: colorAnalysis,
            feedback: this.generateFeedback(totalScore, scores, colorAnalysis),
            suggestions: this.generateSuggestions(scores, colorAnalysis)
        };
    }

    analyzeColors() {
        // Simulate color detection - in real implementation would analyze actual image
        const colorPalettes = [
            {
                primary: "navy blue",
                secondary: "white",
                accent: "gray",
                description: "Classic navy and white combination with gray accents"
            },
            {
                primary: "black",
                secondary: "white",
                accent: "red",
                description: "Bold black and white with a pop of red"
            },
            {
                primary: "beige",
                secondary: "brown",
                accent: "cream",
                description: "Warm neutral tones in beige, brown, and cream"
            },
            {
                primary: "dark green",
                secondary: "khaki",
                accent: "tan",
                description: "Earth tones with dark green and khaki"
            },
            {
                primary: "charcoal",
                secondary: "light blue",
                accent: "silver",
                description: "Professional charcoal with light blue and silver accents"
            },
            {
                primary: "burgundy",
                secondary: "cream",
                accent: "gold",
                description: "Rich burgundy with cream and gold touches"
            },
            {
                primary: "gray",
                secondary: "white",
                accent: "black",
                description: "Monochromatic gray scale with white and black"
            },
            {
                primary: "olive green",
                secondary: "brown",
                accent: "beige",
                description: "Military-inspired olive green with brown and beige"
            }
        ];

        // Randomly select a color palette for demonstration
        const selectedPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        
        return {
            detectedColors: selectedPalette,
            colorHarmony: this.evaluateColorHarmony(selectedPalette),
            dominantColors: [selectedPalette.primary, selectedPalette.secondary],
            accentColors: [selectedPalette.accent]
        };
    }

    evaluateColorHarmony(palette) {
        // Simple color harmony evaluation
        const harmonyRules = {
            "navy blue": { goodWith: ["white", "gray", "beige", "light blue"], score: 8 },
            "black": { goodWith: ["white", "gray", "red", "silver"], score: 9 },
            "beige": { goodWith: ["brown", "cream", "white", "tan"], score: 7 },
            "dark green": { goodWith: ["khaki", "tan", "brown", "cream"], score: 8 },
            "charcoal": { goodWith: ["light blue", "silver", "white", "gray"], score: 8 },
            "burgundy": { goodWith: ["cream", "gold", "beige", "white"], score: 7 },
            "gray": { goodWith: ["white", "black", "silver", "blue"], score: 8 },
            "olive green": { goodWith: ["brown", "beige", "tan", "cream"], score: 7 }
        };

        const primaryColor = palette.primary.toLowerCase();
        const secondaryColor = palette.secondary.toLowerCase();
        
        if (harmonyRules[primaryColor] && harmonyRules[primaryColor].goodWith.includes(secondaryColor)) {
            return harmonyRules[primaryColor].score;
        }
        
        return Math.floor(Math.random() * 3) + 6; // Default score 6-8
    }

    generateFeedback(score, scores, colorAnalysis) {
        const colorDescription = colorAnalysis.detectedColors.description;
        const dominantColors = colorAnalysis.dominantColors.join(" and ");
        const accentColors = colorAnalysis.accentColors.join(" and ");
        
        let baseFeedback = "";
        if (score >= 8) {
            baseFeedback = "Excellent outfit! Your style choices show great attention to detail and fashion sense. You're ready to make a great impression!";
        } else if (score >= 6) {
            baseFeedback = "Good outfit with solid style choices. There are a few areas where you could enhance your look to make it even better.";
        } else if (score >= 4) {
            baseFeedback = "Your outfit has potential but needs some adjustments. With a few tweaks, you can create a much more polished look.";
        } else {
            baseFeedback = "This outfit needs significant improvement. Consider these suggestions to create a more stylish and appropriate look.";
        }

        return `${baseFeedback}\n\n🎨 Color Analysis: I can see you're wearing ${colorDescription}. Your dominant colors are ${dominantColors} with ${accentColors} accents. This creates a ${this.getColorMood(colorAnalysis.detectedColors)} look.`;
    }

    getColorMood(palette) {
        const moodMap = {
            "navy blue": "professional and trustworthy",
            "black": "sophisticated and elegant", 
            "beige": "warm and approachable",
            "dark green": "natural and grounded",
            "charcoal": "modern and refined",
            "burgundy": "rich and confident",
            "gray": "balanced and versatile",
            "olive green": "adventurous and earthy"
        };
        
        return moodMap[palette.primary] || "unique and personal";
    }

    generateSuggestions(scores, colorAnalysis) {
        const suggestions = [];
        const palette = colorAnalysis.detectedColors;

        // Color-specific suggestions
        if (scores.colorHarmony < 6) {
            suggestions.push(`Try coordinating colors better - your ${palette.primary} would work well with ${this.getColorSuggestions(palette.primary)}`);
        }

        if (scores.styleConsistency < 6) {
            suggestions.push("Mix formal and casual pieces more carefully - stick to one style direction");
        }

        if (scores.occasionAppropriate < 6) {
            suggestions.push("Consider the occasion - dress appropriately for the event or setting");
        }

        if (scores.fitAndProportion < 6) {
            suggestions.push("Pay attention to fit - well-fitted clothes make a huge difference in appearance");
        }

        if (scores.accessories < 5) {
            suggestions.push(`Add some accessories like a watch, belt, or jewelry to complete your look - consider ${this.getAccessorySuggestions(palette)}`);
        }

        // Add color-specific suggestions
        suggestions.push(`Your ${palette.primary} base works well - consider adding a ${this.getAccentSuggestion(palette)} for more visual interest`);
        suggestions.push("Consider the season and weather when choosing your outfit");
        suggestions.push("Make sure your shoes complement your overall style");
        suggestions.push("Don't forget about grooming - clean, well-groomed appearance enhances any outfit");

        return suggestions.slice(0, 5); // Return top 5 suggestions
    }

    getColorSuggestions(primaryColor) {
        const colorSuggestions = {
            "navy blue": "white, light blue, or gray accents",
            "black": "white, silver, or a pop of color like red",
            "beige": "brown, cream, or tan tones",
            "dark green": "khaki, tan, or earth tones",
            "charcoal": "light blue, silver, or white",
            "burgundy": "cream, gold, or beige",
            "gray": "white, black, or blue accents",
            "olive green": "brown, beige, or tan"
        };
        
        return colorSuggestions[primaryColor] || "complementary colors";
    }

    getAccessorySuggestions(palette) {
        const accessoryMap = {
            "navy blue": "silver or gold jewelry",
            "black": "silver accessories or a bold statement piece",
            "beige": "gold or bronze accents",
            "dark green": "wood or earth-tone accessories",
            "charcoal": "silver or metallic accessories",
            "burgundy": "gold or warm-toned jewelry",
            "gray": "silver or colorful accessories",
            "olive green": "brown leather or natural materials"
        };
        
        return accessoryMap[palette.primary] || "matching accessories";
    }

    getAccentSuggestion(palette) {
        return `${palette.accent} accent piece or accessory`;
    }

    displayResults(analysis) {
        this.scoreValue.textContent = analysis.score;
        this.feedbackText.textContent = analysis.feedback;
        
        // Display color information
        this.displayColorAnalysis(analysis.colorAnalysis);
        
        this.suggestionsList.innerHTML = '';
        analysis.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            this.suggestionsList.appendChild(li);
        });

        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    displayColorAnalysis(colorAnalysis) {
        const palette = colorAnalysis.detectedColors;
        
        // Set color swatches
        this.primaryColor.style.backgroundColor = this.getColorHex(palette.primary);
        this.primaryColor.setAttribute('data-color', palette.primary);
        
        this.secondaryColor.style.backgroundColor = this.getColorHex(palette.secondary);
        this.secondaryColor.setAttribute('data-color', palette.secondary);
        
        this.accentColor.style.backgroundColor = this.getColorHex(palette.accent);
        this.accentColor.setAttribute('data-color', palette.accent);
        
        // Set color description
        this.colorDescription.textContent = palette.description;
    }

    getColorHex(colorName) {
        const colorMap = {
            "navy blue": "#1e3a8a",
            "white": "#ffffff",
            "gray": "#6b7280",
            "black": "#000000",
            "red": "#dc2626",
            "beige": "#f5f5dc",
            "brown": "#8b4513",
            "cream": "#fdf6e3",
            "dark green": "#064e3b",
            "khaki": "#c3b091",
            "tan": "#d2b48c",
            "charcoal": "#36454f",
            "light blue": "#93c5fd",
            "silver": "#c0c0c0",
            "burgundy": "#800020",
            "gold": "#ffd700",
            "olive green": "#6b8e23"
        };
        
        return colorMap[colorName.toLowerCase()] || "#666666";
    }

    resetToUpload() {
        this.previewSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.photoInput.value = '';
        this.uploadArea.style.display = 'block';
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new OutfitEvaluator();
});
