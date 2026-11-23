// The bookshelf at the bottom of the home page, in order from left to right.
// The shelf lays itself out: one row on a wide screen, and on a narrow one as
// many rows as it needs, of about equal length. Hovering a spine (tapping it on
// a phone) shows the book's card; clicking the spine, or the card's link, opens
// `href`.

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

export const books: Book[] = [
  { title: "Principles: Life and Work", spine: "Principles", author: "Ray Dalio", href: "https://www.amazon.com/dp/1501124021", thickness: "thick" },
  { title: "Poor Richard's Almanack", author: "Benjamin Franklin", href: "https://www.amazon.com/dp/0486484491", thickness: "thin" },
  { title: "Poor Charlie's Almanack: The Essential Wit and Wisdom of Charles T. Munger", spine: "Poor Charlie's Almanack", author: "Charles T. Munger", href: "https://www.amazon.com/dp/1953953239", thickness: "thick" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", href: "https://www.amazon.com/dp/1451639619", thickness: "thick" },
  { title: "活法", author: "稻盛和夫", href: "https://www.amazon.com/dp/B07B4SXZBJ", thickness: "thin" },
  { title: "干法", author: "稻盛和夫", href: "https://www.amazon.com/dp/7111635574", thickness: "thin" },
  { title: "心法：稻盛和夫的哲学", spine: "心法", author: "稻盛和夫", href: "https://www.amazon.com/dp/B00KWXCDTG", thickness: "thin" },
  { title: "大道：段永平投资问答录", author: "段永平", href: "https://www.amazon.com/dp/7521774663", thickness: "thick" },
  { title: "Principles for Navigating Big Debt Crises", spine: "Big Debt Crises", author: "Ray Dalio", href: "https://www.amazon.com/dp/1668009293", thickness: "thick" },
  { title: "Only the Paranoid Survive", author: "Andrew S. Grove", href: "https://www.amazon.com/dp/0385483821" },
  { title: "Built to Last: Successful Habits of Visionary Companies", spine: "Built to Last", author: "Jim Collins & Jerry I. Porras", href: "https://www.amazon.com/dp/0060516402" },
  { title: "Good to Great: Why Some Companies Make the Leap...and Others Don't", spine: "Good to Great", author: "Jim Collins", href: "https://www.amazon.com/dp/0066620996" },
  { title: "Influence: The Psychology of Persuasion", spine: "Influence", author: "Robert B. Cialdini", href: "https://www.amazon.com/dp/006124189X" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", href: "https://www.amazon.com/dp/0374533555", thickness: "thick" },
  { title: "Sapiens: A Brief History of Humankind", spine: "Sapiens", author: "Yuval Noah Harari", href: "https://www.amazon.com/dp/0063422018", thickness: "thick" },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", href: "https://www.amazon.com/dp/0393354326", thickness: "thick" },
  { title: "From the Soil: The Foundations of Chinese Society", spine: "From the Soil", author: "Fei Xiaotong", href: "https://www.amazon.com/dp/0520077962", thickness: "thin" },
  { title: "The Autobiography of Benjamin Franklin", author: "Benjamin Franklin", href: "https://www.amazon.com/dp/0486290735", thickness: "thin" },
  { title: "Zen Mind, Beginner's Mind", author: "Shunryu Suzuki", href: "https://www.amazon.com/dp/1611808413", thickness: "thin" },
  { title: "上海交通大学生存手册", spine: "交大生存手册", author: "交大生存手册编委会", href: "https://survivesjtu.gitbook.io/survivesjtumanual/", thickness: "thin", linkLabel: "Read online" },
];
