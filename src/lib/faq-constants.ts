type FAQItem = {
  value: string;
  question: string;
  answer: string;
};

type FAQSection = {
  title: string;
  badge?: string;
  items: FAQItem[];
};

export const faqData: FAQSection[] = [
  {
    title: "VPN Services",
    badge: "Coming Soon",
    items: [
      {
        value: "vpn-1",
        question: "What is a VPN and why do I need one?",
        answer: "A VPN (Virtual Private Network) creates a secure, encrypted connection between your device and the internet. It protects your online privacy by masking your IP address, encrypts your data, and allows you to bypass geo-restrictions. Our VPN service ensures your internet activity remains private and secure, especially on public Wi-Fi networks."
      },
      {
        value: "vpn-2",
        question: "How fast is your VPN service?",
        answer: "Our VPN service is optimized for speed with global server network and advanced protocols. Most users experience minimal speed reduction (typically 10-20%) compared to their regular internet connection. Speed depends on your base connection, server location, and network congestion."
      },
      {
        value: "vpn-3",
        question: "Do you log user activity?",
        answer: "No, we maintain a strict no-logs policy. We do not store, monitor, or share any information about your online activities, browsing history, or connection destinations. Only minimal operational data (server load, uptime) is collected for service stability and performance monitoring."
      },
      {
        value: "vpn-4",
        question: "Which devices are supported?",
        answer: "Our VPN service currently supports Windows machines only. Android development is coming soon. You can connect up to 5 devices simultaneously with a single account. Easy-to-use Windows app is available for download."
      }
    ]
  },
  {
    title: "Hosting Services",
    items: [
      {
        value: "hosting-1",
        question: "What hosting plans do you offer?",
        answer: "We offer a range of hosting plans from Free to Enterprise level, designed to meet different needs and budgets. All plans include NVMe storage, DDoS protection, and 99.9% uptime guarantee.\n\nVisit our <a href=\"/#pricing\" className=\"text-blue-400 hover:text-blue-300 underline\">pricing section</a> to see detailed specifications for each plan and choose the one that best fits your requirements."
      },
      {
        value: "hosting-2",
        question: "Do you provide website migration assistance?",
        answer: "Yes, we offer free website migration for new customers. Our technical support team will help transfer your website from your current host to our servers. This includes moving files, databases, and configuring your domain settings. Contact our support team to get started."
      },
      {
        value: "hosting-3",
        question: "What security features are included?",
        answer: "All hosting plans include essential security features like DDoS protection, free SSL certificates, advanced firewalls, and regular security updates. Higher-tier plans offer enhanced security suites with advanced monitoring and dedicated support.\n\nCheck our <a href=\"/#pricing\" className=\"text-blue-400 hover:text-blue-300 underline\">pricing section</a> for detailed security features included with each plan."
      },
      {
        value: "hosting-4",
        question: "What is your refund policy?",
        answer: "We offer a satisfaction guarantee for our hosting services. Please take a look at our <a href=\"/terms\" className=\"text-blue-400 hover:text-blue-300 underline\">Terms of Service</a> and <a href=\"/privacy\" className=\"text-blue-400 hover:text-blue-300 underline\">Privacy Policy</a> for detailed information about our refund policy and service guarantees."
      }
    ]
  },
  {
    title: "General",
    items: [
      {
        value: "general-1",
        question: "How do I get started?",
        answer: "Getting started is easy! Visit hosting.neonnextgeneration.com for web hosting services. Choose your plan and complete the purchase. After purchasing, you'll see a \"Login Control Panel\" button on your <a href=\"https://billing.neonnextgeneration.com/services/\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:text-blue-300 underline\">billing dashboard</a>. Our control panel provides easy setup guides and 24/7 support."
      },
      {
        value: "general-2",
        question: "What payment methods do you accept?",
        answer: "We accept Stripe, PayPal, and all major credit cards via our <a href=\"https://billing.neonnextgeneration.com/\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:text-blue-300 underline\">billing platform</a>. All payments are processed securely through encrypted connections."
      },
      {
        value: "general-3",
        question: "How can I contact support?",
        answer: "Our support team is available 24/7 through multiple channels: Email us at <a href=\"mailto:support@neonnextgeneration.com\" className=\"text-blue-400 hover:text-blue-300 underline\">support@neonnextgeneration.com</a> for technical issues, <a href=\"mailto:billing@neonnextgeneration.com\" className=\"text-blue-400 hover:text-blue-300 underline\">billing@neonnextgeneration.com</a> for payment inquiries, or join our <a href=\"https://discord.gg/TCyUSF3dbH\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:text-blue-300 underline\">Discord community</a> for real-time help and discussions. Average response time is within 24 hours."
      },
      {
        value: "general-4",
        question: "How to reset my password on the hosting portal?",
        answer: "To reset your hosting panel account password, first log in via your billing dashboard following the steps in our \"How do I get started?\" section above if you haven't already.\n\n<br></br> <br></br> <strong>Steps to reset your password:</strong>\n<ol className=\"list-decimal list-inside mt-2 mb-4 space-y-1\">\n  <li>Navigate to your <a href=\"https://billing.neonnextgeneration.com/services/\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:text-blue-300 underline\">services</a> and select the service you've purchased</li>\n  <li>Click on the \"Login Control Panel\" button available in the actions</li>\n  <li>Once on your hosting panel account, go to the settings page or click <a href=\"https://hosting.neonnextgeneration.com/profile\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:text-blue-300 underline\">here</a> directly</li>\n  <li>Reset your password through the profile settings</li>\n</ol>\n\n<strong>If you haven't reset your password before:</strong> You can request a password reset from us by providing account proof through our <a href=\"https://discord.gg/TCyUSF3dbH\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-blue-400 hover:text-blue-300 underline\">company Discord server</a>."
      }
    ]
  }
];