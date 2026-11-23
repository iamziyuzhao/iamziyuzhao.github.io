// The bookshelf at the bottom of the home page. Each inner array is one shelf,
// left to right. Hovering a spine (tapping it on a phone) shows the book's card;
// clicking the spine, or the card's link, opens `href`.

export interface Book {
  /** Full title, shown on the card. */
  title: string;
  /** Shorter title for the spine; defaults to `title`. */
  spine?: string;
  author: string;
  href: string;
  /** How thick the spine looks. Defaults to "medium". */
  thickness?: "thin" | "medium" | "thick";
  /** Text of the card's link. Defaults to "Buy at Amazon". */
  linkLabel?: string;
}

export const shelves: Book[][] = [
  // Investing and business
  [
    { title: "The Intelligent Investor", author: "Benjamin Graham", href: "https://www.amazon.com/dp/0060555661", thickness: "thick" },
    { title: "一个投机者的告白·实战版", author: "安纳金", href: "https://www.amazon.com/dp/B07PRG1PZL" },
    { title: "大道：段永平投资问答录", author: "段永平", href: "https://www.amazon.com/dp/7521774663", thickness: "thick" },
    { title: "Principles: Life and Work", spine: "Principles", author: "Ray Dalio", href: "https://www.amazon.com/dp/1501124021", thickness: "thick" },
    { title: "Principles for Navigating Big Debt Crises", spine: "Big Debt Crises", author: "Ray Dalio", href: "https://www.amazon.com/dp/1668009293", thickness: "thick" },
    { title: "Only the Paranoid Survive", author: "Andrew S. Grove", href: "https://www.amazon.com/dp/0385483821" },
    { title: "Influence: The Psychology of Persuasion", spine: "Influence", author: "Robert B. Cialdini", href: "https://www.amazon.com/dp/006124189X" },
    { title: "A Compass to Fulfillment", author: "Kazuo Inamori", href: "https://www.amazon.com/dp/0071615091", thickness: "thin" },
    { title: "干法", author: "稻盛和夫", href: "https://www.amazon.com/dp/7111635574", thickness: "thin" },
    { title: "心法：稻盛和夫的哲学", spine: "心法", author: "稻盛和夫", href: "https://www.amazon.com/dp/B00KWXCDTG", thickness: "thin" },
  ],
  // Mind, life and history
  [
    { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", href: "https://www.amazon.com/dp/1451639619", thickness: "thick" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", href: "https://www.amazon.com/dp/0374533555", thickness: "thick" },
    { title: "Sapiens: A Brief History of Humankind", spine: "Sapiens", author: "Yuval Noah Harari", href: "https://www.amazon.com/dp/0063422018", thickness: "thick" },
    { title: "Guns, Germs, and Steel", author: "Jared Diamond", href: "https://www.amazon.com/dp/0393354326", thickness: "thick" },
    { title: "From the Soil: The Foundations of Chinese Society", spine: "From the Soil", author: "Fei Xiaotong", href: "https://www.amazon.com/dp/0520077962", thickness: "thin" },
    { title: "The Autobiography of Benjamin Franklin", author: "Benjamin Franklin", href: "https://www.amazon.com/dp/0486290735", thickness: "thin" },
    { title: "Poor Richard's Almanack", author: "Benjamin Franklin", href: "https://www.amazon.com/dp/0486484491", thickness: "thin" },
    { title: "Zen Mind, Beginner's Mind", author: "Shunryu Suzuki", href: "https://www.amazon.com/dp/1611808413", thickness: "thin" },
    { title: "上海交通大学生存手册", spine: "交大生存手册", author: "交大生存手册编委会", href: "https://survivesjtu.gitbook.io/survivesjtumanual/", thickness: "thin", linkLabel: "Read online" },
  ],
];
