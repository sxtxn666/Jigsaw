document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const messageInput = document.getElementById('message-input');
    const chatForm = document.getElementById('chat-form');

    const toolsData = {
        "Information Gathering": ["Nmap", "Maltego", "Recon-ng", "Shodan"],
        "Vulnerability Assessment": ["Nessus", "OpenVAS", "Nexpose", "Nikto"],
        "Exploitation Tools": ["Metasploit", "BeEF", "SQLmap", "Armitage"],
        "Post-Exploitation": ["Empire", "Mimikatz", "PowerSploit", "Cobalt Strike"],
        "Password Attacks": ["John the Ripper", "Hydra", "Hashcat", "Medusa"],
        "Wireless Attacks": ["Aircrack-ng", "Reaver", "Kismet", "Fern WiFi Cracker"],
        "Web Application Testing": ["Burp Suite", "ZAP Proxy", "w3af", "Skipfish"],
        "Network Scanning & Mapping": ["Nmap", "Netcat", "Angry IP Scanner", "Lanmap2"],
        "Sniffing & Spoofing": ["Wireshark", "Ettercap", "Cain & Abel", "Scapy"],
        "Social Engineering": ["SET (Social Engineer Toolkit)", "King Phisher"],
        "Forensics & Analysis": ["Autopsy", "Volatility", "FTK", "Sleuth Kit"]
    };

    let conversationState = 'initial';
    let currentCategory = null;

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function processMessage(message) {
        const lowerCaseMessage = message.toLowerCase().trim();

        if (lowerCaseMessage === 'help') {
            addMessage("You can type 'list categories' to see all available topics. Then, type the name of a category to see the tools inside.", 'bot');
            return;
        }

        switch (conversationState) {
            case 'initial':
                if (lowerCaseMessage === 'list categories') {
                    const categories = Object.keys(toolsData).join('\n - ');
                    addMessage("Here are the available categories:\n - " + categories, 'bot');
                    addMessage("Please type the name of the category you'd like to explore.", 'bot');
                    conversationState = 'awaiting_category';
                } else {
                    addMessage("I'm not sure what you mean. Type 'list categories' to get started or 'help' for assistance.", 'bot');
                }
                break;

            case 'awaiting_category':
                const category = Object.keys(toolsData).find(c => c.toLowerCase() === lowerCaseMessage);
                if (category) {
                    currentCategory = category;
                    const tools = toolsData[category].join('\n - ');
                    addMessage(`Excellent choice! Here are the tools for ${category}:\n - ${tools}`, 'bot');
                    addMessage("Please type the name of the tool to start the quiz.", 'bot');
                    conversationState = 'awaiting_tool';
                } else {
                    addMessage("I don't recognize that category. Please type one of the categories listed above.", 'bot');
                }
                break;

            case 'awaiting_tool':
                const tool = toolsData[currentCategory].find(t => t.toLowerCase() === lowerCaseMessage);
                if (tool) {
                    addMessage(`Great! Starting the quiz for ${tool}... (Quiz functionality to be implemented)`, 'bot');
                    addMessage("To start over, type 'list categories'.", 'bot');
                    conversationState = 'initial'; // Reset for now
                    currentCategory = null;
                } else {
                    addMessage("I don't recognize that tool. Please type one of the tools listed for the current category.", 'bot');
                }
                break;
        }
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        if (!message) return;

        addMessage(message, 'user');
        messageInput.value = '';

        setTimeout(() => processMessage(message), 500);
    });

    // Initial welcome message
    setTimeout(() => {
        addMessage("Welcome to Jig, your cybersecurity quiz assistant.", 'bot');
        addMessage("Type 'list categories' to see the topics, or 'help' if you need assistance.", 'bot');
    }, 500);
});
